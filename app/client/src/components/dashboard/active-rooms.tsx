import { Lock } from 'lucide-react';
import { Avatar } from '@/components/common/avatar';
import type { ActiveRoom } from './types';

const defaultRooms: ActiveRoom[] = [
  { title: 'Paper Moons', host: 'Aria', isYours: true, guests: ['R', 'S'] },
  { title: 'The Last Reel', host: 'Devon', isYours: false, guests: ['D', 'A'] },
];

interface ActiveRoomsProps {
  rooms?: ActiveRoom[];
}

export function ActiveRooms({ rooms = defaultRooms }: ActiveRoomsProps) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          Your active rooms
        </h2>
        <span className="text-xs text-muted-foreground">
          rooms you&apos;re hosting or invited to
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
              <button
                type="button"
                className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
