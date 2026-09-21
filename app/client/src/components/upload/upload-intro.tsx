interface UploadIntroProps {
  title?: string;
  description?: string;
}

export function UploadIntro({
  title = 'Upload a video',
  description = 'Bring something to watch. It stays up for six hours — plenty of time for movie night, not long enough to become a library.',
}: UploadIntroProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
