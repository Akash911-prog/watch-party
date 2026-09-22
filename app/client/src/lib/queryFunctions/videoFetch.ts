import type { Video } from '@watchparty/shared/types';
import { api } from '../api-client';
import { ApiError } from '../api-client/api-client';
import type { LibraryVideo } from '@/components/dashboard';
import { randomColor } from '../utils';

export async function fetchVideos(): Promise<LibraryVideo[]> {
  try {
    const res = await api.get<Video[]>('/video');

    const libraryVideos: LibraryVideo[] = res
      .map((video) => {
        const expiresInMin = video.expiresAt
          ? Math.max(
              0,
              Math.round(
                (new Date(video.expiresAt).getTime() - Date.now()) / 60000,
              ),
            )
          : 0;
        return {
          id: video.id,
          title: video.title,
          duration: video.duration,
          tone: randomColor(),
          expiresInMin: expiresInMin,
        };
      })
      .filter((video) => video.expiresInMin > 0);

    return libraryVideos;
  } catch (e) {
    if (e instanceof ApiError) {
      console.error(e.data);
    } else {
      console.error(e);
    }
  }
  return [];
}
