import { useState } from 'react';
import { Play, Upload, Lock, Timer } from 'lucide-react';
import { Link } from '@tanstack/react-router';

// Per-video accent swatches. These are content, not chrome — they stay as
// literal colors (like distinct film palettes on a poster wall) rather than
// theme tokens.
const library = [
  {
    title: 'Static Bloom',
    duration: '42 min',
    tone: '#3B2E4A',
    expiresInMin: 41,
  },
  {
    title: 'Midnight Frequency',
    duration: '1h 12m',
    tone: '#2E3B47',
    expiresInMin: 138,
  },
  {
    title: 'Paper Moons',
    duration: '58 min',
    tone: '#47332E',
    expiresInMin: 312,
  },
  {
    title: 'The Last Reel',
    duration: '1h 34m',
    tone: '#2E4739',
    expiresInMin: 205,
  },
  {
    title: 'Low Tide Station',
    duration: '51 min',
    tone: '#4A2E3F',
    expiresInMin: 356,
  },
  {
    title: 'Amber & Ash',
    duration: '1h 05m',
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

const rooms = [
  { title: 'Paper Moons', host: 'Aria', isYours: true, guests: ['R', 'S'] },
  { title: 'The Last Reel', host: 'Devon', isYours: false, guests: ['D', 'A'] },
];

function Sprockets() {
  return (
    <div className="flex justify-between px-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 rounded-full bg-background" />
      ))}
    </div>
  );
}

function Avatar({ letter, size = 28 }: { letter: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground"
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
}

export default function Dashboard() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="dark min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto px-6 py-8">
        {/* Hero */}
        <section className="mb-12 rounded-lg border border-border bg-card px-8 py-10">
          <h1 className="max-w-md text-3xl font-bold leading-tight">
            What's playing tonight?
          </h1>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Upload a video, then invite friends to watch it together, perfectly
            in sync.
          </p>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            Rooms are invite-only. Videos are removed 6 hours after upload.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              to="/upload"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:translate-y-0.5 hover:opacity-90 active:translate-y-2"
            >
              <Upload className="h-4 w-4" strokeWidth={2} />
              Upload a video
            </Link>
            <Link
              to="/room"
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:translate-y-0.5 hover:bg-secondary active:translate-y-2"
            >
              Create a room
            </Link>
          </div>
        </section>

        {/* Active rooms */}
        <section className="mb-12">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              Your active rooms
            </h2>
            <span className="text-xs text-muted-foreground">
              rooms you're hosting or invited to
            </span>
          </div>

          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {rooms.map((room) => (
              <div
                key={room.title}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                  </span>

                  <div>
                    <p className="text-base font-medium">{room.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {room.isYours
                        ? "you're hosting"
                        : `hosted by ${room.host} · you're invited`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" strokeWidth={1.5} />
                    Private
                  </div>
                  <div className="flex -space-x-2">
                    {room.guests.map((g, i) => (
                      <Avatar key={i} letter={g} size={24} />
                    ))}
                  </div>
                  <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Library */}
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              Your library
            </h2>
            <span className="text-xs text-muted-foreground">
              {library.length} videos
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {library.map((video) => (
              <div
                key={video.title}
                onMouseEnter={() => setHovered(video.title)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer rounded-lg border border-border bg-card"
              >
                <div
                  className="relative flex h-24 flex-col justify-between rounded-t-lg py-2"
                  style={{ backgroundColor: video.tone }}
                >
                  <Sprockets />
                  {hovered === video.title && (
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

                  <Sprockets />
                </div>

                <div className="px-3 py-3">
                  <p className="truncate text-sm font-medium">{video.title}</p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Play
                      className="h-3 w-3"
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                    {video.duration} runtime
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
