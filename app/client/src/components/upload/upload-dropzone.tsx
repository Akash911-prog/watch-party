import { useState, type DragEvent } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  onBrowseClick: () => void;
  className?: string;
}

export function UploadDropzone({
  onFileSelect,
  onBrowseClick,
  className,
}: UploadDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onBrowseClick}
      className={cn(
        'flex cursor-pointer flex-col items-center gap-4 px-8 py-16 text-center transition-all',
        isDragActive && 'blur-xl',
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary">
        <UploadIcon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
      </div>

      <div>
        <p className="text-base font-medium">Drag a video file here</p>
        <p className="mt-1 text-sm text-muted-foreground">
          or choose one from your device
        </p>
      </div>

      <button
        type="button"
        className="mt-2 flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          onBrowseClick();
        }}
      >
        Browse files
      </button>

      <p className="mt-3 text-xs text-muted-foreground">
        MP4, MOV, or MKV · up to 8GB
      </p>
    </div>
  );
}
