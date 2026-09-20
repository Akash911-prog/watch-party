import type { AppError } from '@watchparty/shared/errors';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends Omit<
  RequestInit,
  'method' | 'body' | 'credentials'
> {
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  credentials?: RequestCredentials;
  /** Return the raw Response instead of the parsed body. */
  raw?: boolean;
  /** Decide which statuses count as success. Default: 2xx. */
  validateStatus?: (status: number) => boolean;
}

interface ApiClientConfig {
  baseURL?: string;
  headers?: HeadersInit;
  timeout?: number;
  credentials?: RequestCredentials; // 'omit' | 'same-origin' | 'include'
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: AppError | null;

  constructor(status: number, statusText: string, data: AppError | null) {
    super(`Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

type InternalConfig = RequestConfig & { url: string };

type RequestInterceptor = (
  config: InternalConfig,
) => InternalConfig | Promise<InternalConfig>;

type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: unknown) => unknown | Promise<unknown>;

// Merge any HeadersInit shapes (plain object, Headers, [k, v][]) into a plain
// object with lowercase keys. Later sources win.
const mergeHeaders = (
  ...sources: (HeadersInit | undefined)[]
): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const source of sources) {
    new Headers(source).forEach((value, key) => {
      out[key] = value;
    });
  }
  return out;
};

// Bodies that fetch understands natively and must NOT be JSON-stringified.
const isRawBody = (data: unknown): data is BodyInit =>
  data instanceof Blob ||
  data instanceof ArrayBuffer ||
  ArrayBuffer.isView(data) || // Uint8Array, Buffer, DataView...
  data instanceof FormData ||
  data instanceof URLSearchParams ||
  (typeof ReadableStream !== 'undefined' && data instanceof ReadableStream);

const defaultValidateStatus = (status: number) => status >= 200 && status < 300;

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  private credentials: RequestCredentials;

  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL ?? '';
    this.defaultHeaders = mergeHeaders(config.headers);
    this.timeout = config.timeout ?? 15000;
    this.credentials = config.credentials ?? 'include';
  }

  interceptors = {
    request: {
      use: (fn: RequestInterceptor) => this.requestInterceptors.push(fn),
    },
    response: {
      use: (
        onFulfilled: ResponseInterceptor,
        onRejected?: ErrorInterceptor,
      ) => {
        this.responseInterceptors.push(onFulfilled);
        if (onRejected) this.errorInterceptors.push(onRejected);
      },
    },
  };

  private buildUrl(url: string, params?: RequestConfig['params']) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    if (!params) return fullUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    return queryString ? `${fullUrl}?${queryString}` : fullUrl;
  }

  private async safeParse(response: Response) {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json().catch(() => null);
    }
    return response.text().catch(() => null);
  }

  private async request<T>(
    method: Method,
    url: string,
    config: RequestConfig = {},
  ): Promise<T> {
    let mergedConfig: InternalConfig = {
      ...config,
      url,
      headers: mergeHeaders(this.defaultHeaders, config.headers),
    };

    for (const interceptor of this.requestInterceptors) {
      mergedConfig = await interceptor(mergedConfig);
    }

    const {
      params,
      data,
      url: finalUrl,
      credentials,
      raw,
      validateStatus,
      signal: userSignal,
      headers: finalHeaders,
      ...rest
    } = mergedConfig;

    const fullUrl = this.buildUrl(finalUrl, params);

    // Body: raw bodies pass through, everything else is JSON.
    // GET can't have a body, so `data` is ignored there instead of throwing.
    const headers = new Headers(finalHeaders);
    let body: BodyInit | undefined;
    if (data !== undefined && method !== 'GET') {
      if (isRawBody(data)) {
        body = data; // fetch sets Content-Type (+ boundary for FormData)
      } else {
        body = JSON.stringify(data);
        if (!headers.has('content-type')) {
          headers.set('content-type', 'application/json');
        }
      }
    }

    // Timeout + optional caller signal, both respected.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    const signal = userSignal
      ? AbortSignal.any([userSignal, controller.signal])
      : controller.signal;

    try {
      let response = await fetch(fullUrl, {
        ...rest,
        method,
        headers,
        body,
        credentials: credentials ?? this.credentials,
        signal,
      });

      clearTimeout(timeoutId);

      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      const isOk = (validateStatus ?? defaultValidateStatus)(response.status);
      if (!isOk) {
        const errorData = (await this.safeParse(response)) as AppError;
        throw new ApiError(response.status, response.statusText, errorData);
      }

      if (raw) return response as T;

      if (response.status === 204) return undefined as T;

      return (await this.safeParse(response)) as T;
    } catch (err) {
      clearTimeout(timeoutId);

      let error = err;
      for (const interceptor of this.errorInterceptors) {
        error = await interceptor(error);
      }

      throw error;
    }
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>('GET', url, config);
  }

  post<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>('POST', url, { ...config, data });
  }

  put<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>('PUT', url, { ...config, data });
  }

  patch<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>('PATCH', url, { ...config, data });
  }

  delete<T>(url: string, config?: RequestConfig) {
    return this.request<T>('DELETE', url, config);
  }
}

export const createApiClient = (config?: ApiClientConfig) =>
  new ApiClient(config);

// Default instance, no config — mirrors axios's default export.
// Skip/remove this if you always create a configured instance instead (see lib/api.ts usage).
export const apiClient = new ApiClient();
