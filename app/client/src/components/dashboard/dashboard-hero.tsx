import { Link } from '@tanstack/react-router';
import { Upload } from 'lucide-react';

export function DashboardHero() {
  return (
    <section className="mb-12 rounded-lg border border-border bg-card px-8 py-10">
      <h1 className="max-w-md text-3xl font-bold leading-tight">
        What&apos;s playing tonight?
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        Upload a video, then invite friends to watch it together, perfectly in
        sync.
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
  );
}
