import { Upload as UploadIcon, FileVideo, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressBar } from './progress-bar';

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export interface UploadFormProps {
  file: File;
  title: string;
  onTitleChange: (title: string) => void;
  ticked: boolean;
  onTickedChange: (ticked: boolean) => void;
  isUploading: boolean;
  progress: number;
  errorMessage: string | null;
  done: boolean;
  onChangeFile: () => void;
  onRemoveFile: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function UploadForm({
  file,
  title,
  onTitleChange,
  ticked,
  onTickedChange,
  isUploading,
  progress,
  errorMessage,
  done,
  onChangeFile,
  onRemoveFile,
  onSubmit,
  onCancel,
}: UploadFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-6 px-6 py-7 sm:px-8"
    >
      {/* File Section */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Selected Video
        </span>
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3 sm:p-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
              <FileVideo className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-sm font-medium text-foreground"
                title={file.name}
              >
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onChangeFile}
              disabled={isUploading}
              className="cursor-pointer text-xs"
            >
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onRemoveFile}
              disabled={isUploading}
              className="cursor-pointer text-muted-foreground hover:text-destructive"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title Field */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="video-title"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Video Title
        </Label>
        <Input
          id="video-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter video title"
          disabled={isUploading}
          className="h-10 bg-secondary/20 text-sm focus-visible:bg-secondary/40"
          required
        />
        <p className="text-xs text-muted-foreground">
          Defaults to the filename. You can change this before uploading.
        </p>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="req"
          onChange={(e) => onTickedChange(e.target.checked)}
          checked={ticked}
          disabled={isUploading}
        />
        <label htmlFor="req" className="text-neutral-400">
          I agree that the uploaded video is not a Copyrighted or Licensed work.
          If infringed, The Sole Responsibility is mine to bear.
        </label>
      </div>

      {/* Progress */}
      {isUploading && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Uploading…</span>
            <span className="tabular-nums text-foreground">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {/* Feedback */}
      {errorMessage && !isUploading && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}
      {done && !isUploading && !errorMessage && (
        <p className="text-sm text-foreground">Upload complete.</p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        {isUploading && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={!ticked || !title.trim() || isUploading}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UploadIcon className="h-4 w-4" strokeWidth={2} />
          {errorMessage ? 'Retry' : 'Upload'}
        </Button>
      </div>
    </form>
  );
}
