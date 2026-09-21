import { Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadPolicyNoticeProps {
  className?: string;
}

export function UploadPolicyNotice({ className }: UploadPolicyNoticeProps) {
  return (
    <div
      className={cn(
        'mt-4 flex items-center gap-2 text-xs text-muted-foreground',
        className,
      )}
    >
      <Ban className="h-3.5 w-3.5" strokeWidth={1.5} />
      No copyrighted or licensed content — rooms are private, but uploads are
      still your responsibility.
    </div>
  );
}
