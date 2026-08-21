type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends Omit<
  RequestInit,
  'method' | 'body' | 'credentials'
> {
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  credentials?: RequestCredentials;
}

interface ApiClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  credentials?: RequestCredentials; // 'omit' | 'same-origin' | 'include'
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(status: number, statusText: string, data: unknown) {
    super(`Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

type RequestInterceptor = (
  config: RequestConfig & { url: string },
) =>
  | (RequestConfig & { url: string })
  | Promise<RequestConfig & { url: string }>;

type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: unknown) => unknown | Promise<unknown>;

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
    this.defaultHeaders = config.headers ?? {
      'Content-Type': 'application/json',
    };
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
    let mergedConfig: RequestConfig & { url: string } = {
      ...config,
      url,
      headers: { ...this.defaultHeaders, ...config.headers },
    };

    for (const interceptor of this.requestInterceptors) {
      mergedConfig = await interceptor(mergedConfig);
    }

    const { params, data, url: finalUrl, credentials, ...rest } = mergedConfig;
    const fullUrl = this.buildUrl(finalUrl, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      let response = await fetch(fullUrl, {
        ...rest,
        method,
        body: data !== undefined ? JSON.stringify(data) : undefined,
        credentials: credentials ?? this.credentials,
        signal: config.signal ?? controller.signal,
      });

      clearTimeout(timeoutId);

      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        const errorData = await this.safeParse(response);
        throw new ApiError(response.status, response.statusText, errorData);
      }

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
