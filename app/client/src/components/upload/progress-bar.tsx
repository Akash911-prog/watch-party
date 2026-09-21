import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full border border-border bg-background',
        className,
      )}
    >
      <div
        className="h-full bg-foreground transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}
