import { cn } from '@/lib/utils';

interface SprocketsProps {
  count?: number;
  className?: string;
}

export function Sprockets({ count = 14, className }: SprocketsProps) {
  return (
    <div className={cn('flex justify-between px-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 rounded-full bg-background" />
      ))}
    </div>
  );
}
