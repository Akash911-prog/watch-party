// upload-video.ts
import { createApiClient } from './api-client/api-client';

interface UploadOptions {
  onProgress?: (pct: number) => void;
  signal?: AbortSignal;
}

export async function uploadVideo<T = unknown>(
  uploadUrl: string,
  file: File,
  { onProgress, signal }: UploadOptions = {},
): Promise<T> {
  const yt = createApiClient({
    credentials: 'omit',
    timeout: 10 * 60_000,
  });

  const CHUNK = 10 * 1024 * 1024; // multiple of 256 KiB
  const size = file.size;

  let start = 0;
  while (start < size) {
    const end = Math.min(start + CHUNK, size) - 1;

    const res = await yt.put<Response>(
      uploadUrl,
      file.slice(start, end + 1, file.type),
      {
        headers: { 'Content-Range': `bytes ${start}-${end}/${size}` },
        raw: true,
        signal,
        validateStatus: (s) => s === 308 || (s >= 200 && s < 300),
      },
    );

    if (res.status === 308) {
      const range = res.headers.get('Range'); // "bytes=0-N"
      // If the browser hides Range (CORS), assume the chunk landed instead of
      // restarting from 0 forever.
      start = range ? Number(range.split('-')[1]) + 1 : end + 1;
      onProgress?.(Math.round((start / size) * 100));
    } else {
      onProgress?.(100);
      return (await res.json()) as T;
    }
  }

  throw new Error('Upload ended without a final response');
}
