import { useState } from 'react';
import { Play, Timer } from 'lucide-react';
import { Sprockets } from '@/components/common/sprockets';
import type { LibraryVideo } from './types';

const defaultLibrary: LibraryVideo[] = [
  {
    title: 'Static Bloom',
    duration: 60,
    tone: '#3B2E4A',
    expiresInMin: 41,
  },
  {
    title: 'Midnight Frequency',
    tone: '#2E3B47',
    duration: 1000,
    expiresInMin: 138,
  },
  {
    title: 'Paper Moons',
    duration: 237582,
    tone: '#47332E',
    expiresInMin: 312,
  },
  {
    title: 'The Last Reel',
    duration: 23087823,
    tone: '#2E4739',
    expiresInMin: 205,
  },
  {
    title: 'Low Tide Station',
    duration: 121623879,
    tone: '#4A2E3F',
    expiresInMin: 356,
  },
  {
    title: 'Amber & Ash',
    duration: 348477,
    tone: '#3F4A2E',
    expiresInMin: 12,
  },
];

function formatExpiry(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

interface VideoCardProps {
  video: LibraryVideo;
  isHovered: boolean;
  onHover: (title: string | null) => void;
}

export function VideoCard({ video, isHovered, onHover }: VideoCardProps) {
  return (
    <div
      onMouseEnter={() => onHover(video.title)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer rounded-lg border border-border bg-card"
    >
      <div
        className="relative flex h-24 flex-col justify-between rounded-t-lg py-2"
        style={{ backgroundColor: video.tone }}
      >
        <Sprockets count={10} className="px-2" />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-t-lg bg-black/50">
            <Play
              className="h-6 w-6 text-foreground"
              strokeWidth={1.5}
              fill="currentColor"
            />
          </div>
        )}

        <div
          className={`absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            video.expiresInMin <= 60
              ? 'bg-destructive text-background'
              : 'bg-black/55 text-foreground'
          }`}
        >
          <Timer className="h-3 w-3" strokeWidth={2} />
          Expires in {formatExpiry(video.expiresInMin)}
        </div>

        <Sprockets count={10} className="px-2" />
      </div>

      <div className="px-3 py-3">
        <p className="truncate text-sm font-medium">{video.title}</p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Play className="h-3 w-3" strokeWidth={1.5} fill="currentColor" />
          {formatExpiry(video.duration)} runtime
        </div>
      </div>
    </div>
  );
}

interface VideoLibraryProps {
  videos?: LibraryVideo[];
}

export function VideoLibrary({ videos = defaultLibrary }: VideoLibraryProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          Your library
        </h2>
        <span className="text-xs text-muted-foreground">
          {videos.length} videos
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            key={video.title}
            video={video}
            isHovered={hovered === video.title}
            onHover={setHovered}
          />
        ))}
      </div>
    </section>
  );
}
