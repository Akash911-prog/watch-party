// use-video-upload.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { uploadVideo } from '../lib/video-uploader';

export function useVideoUpload<T = unknown>() {
  const [progress, setProgress] = useState(0); // 0-100
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => abortRef.current?.abort(), []);

  // abort if the component unmounts mid-upload
  useEffect(() => () => abortRef.current?.abort(), []);

  const upload = useCallback(async (uploadUrl: string, file: File) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setProgress(0);
    setError(null);
    setIsUploading(true);

    try {
      return await uploadVideo<T>(uploadUrl, file, {
        signal: controller.signal,
        onProgress: setProgress,
      });
    } catch (err) {
      if (!controller.signal.aborted) setError(err);
      throw err;
    } finally {
      if (abortRef.current === controller) setIsUploading(false);
    }
  }, []);

  return { upload, progress, isUploading, error, cancel };
}
