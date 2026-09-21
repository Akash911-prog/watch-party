import { cn } from '@/lib/utils';

interface AvatarProps {
  letter: string;
  size?: number;
  className?: string;
}

export function Avatar({ letter, size = 28, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
}
