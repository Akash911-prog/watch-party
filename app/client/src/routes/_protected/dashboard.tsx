import { createFileRoute } from '@tanstack/react-router';
import {
  DashboardHero,
  ActiveRooms,
  VideoLibrary,
} from '@/components/dashboard';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchVideos } from '@/lib/queryFunctions/videoFetch';
import { RouteErrorFallback } from '@/components/common/route-error-fallback';

const videosQueryOptions = queryOptions({
  queryKey: ['video'],
  queryFn: () => fetchVideos(),
});

export const Route = createFileRoute('/_protected/dashboard')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(videosQueryOptions);
  },
  errorComponent: RouteErrorFallback,
  component: DashboardPage,
});

function DashboardPage() {
  const { data: _videos } = useSuspenseQuery(videosQueryOptions);

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
