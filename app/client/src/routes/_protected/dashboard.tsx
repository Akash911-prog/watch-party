import { createFileRoute } from '@tanstack/react-router';
import {
  DashboardHero,
  ActiveRooms,
  VideoLibrary,
} from '@/components/dashboard';

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="dark min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto px-6 py-8">
        <DashboardHero />
        <ActiveRooms />
        <VideoLibrary />
      </div>
    </div>
  );
}
