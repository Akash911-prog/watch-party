import {
  Upload as UploadIcon,
  Film,
  Clock,
  Users,
  Ban,
  FileVideo,
  X,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { VideoMetadata } from '@watchparty/shared/types';
import { api } from '@/lib/api-client';
import { useVideoUpload } from '@/hooks/use-video-uploader';

const currentUser = { letter: 'A' };

const steps = [
  {
    icon: Film,
    title: 'It gets processed',
    body: 'We prep the file for smooth, synced playback — usually takes under a minute.',
  },
  {
    icon: Users,
    title: 'You invite people',
    body: 'Create a room from it and send the link. Only people you invite can watch.',
  },
  {
    icon: Clock,
    title: 'It disappears',
    body: 'Six hours after upload, the file and the room are both gone for good.',
  },
];

function Avatar({ letter, size = 28 }: { letter: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground"
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
}

function Sprockets() {
  return (
    <div className="flex justify-between px-3">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 rounded-full bg-background" />
      ))}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="h-1.5 w-full overflow-hidden rounded-full border border-border bg-background"
    >
      <div
        className="h-full bg-foreground transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function UploadPage() {
  const [ticked, setTicked] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const { upload, progress, isUploading, error, cancel } = useVideoUpload();

  const inputRef = useRef<HTMLInputElement>(null);

  // Surface errors coming from the upload hook (aborts don't set `error`)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (error) setErrorMessage('Upload failed. Please try again.');
  }, [error]);

  const handleSelectedFile = (selectedFile: File) => {
    if (isUploading) return;
    setFile(selectedFile);
    setErrorMessage(null);
    setDone(false);
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
    setTitle(nameWithoutExt || selectedFile.name);
  };

  const handleRemoveFile = () => {
    if (isUploading) return;
    setFile(null);
    setTitle('');
    setErrorMessage(null);
    setDone(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  // Handle dropped files
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Fallback: standard click-to-select files
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSelectedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  const onClickUpload = async () => {
    if (!file || isUploading) return;

    setErrorMessage(null);
    setDone(false);

    const metadata: VideoMetadata = {
      title: title,
      size: file.size,
      mimeType: file.type,
    };

    // 1. create the session on the server
    let uploadUrl: string;
    try {
      ({ uploadUrl } = await api.post<{ uploadUrl: string }>(
        '/video/upload',
        metadata,
      ));
    } catch (e) {
      console.error(e);
      setErrorMessage('Could not start the upload. Please try again.');
      return;
    }

    // 2. send the bytes. The hook stores the error (and ignores user cancels)
    try {
      await upload(uploadUrl, file);
      setDone(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="dark min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between pb-10">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Showtime
          </Link>
          <Avatar letter={currentUser.letter} size={32} />
        </header>

        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">Upload a video</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Bring something to watch. It stays up for six hours — plenty of time
            for movie night, not long enough to become a library.
          </p>
        </div>

        {/* Dropzone / Upload Form */}
        <div
          className={`overflow-hidden rounded-lg border bg-card transition-colors ${
            file ? 'border-solid border-border' : 'border-dashed border-border'
          }`}
        >
          <div className="bg-secondary/40 py-2">
            <Sprockets />
          </div>

          <input
            type="file"
            className="hidden"
            accept="video/*"
            ref={inputRef}
            onChange={handleFileChange}
          />

          {!file && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
              className={`flex flex-col items-center gap-4 px-8 py-16 text-center ${
                isDragActive ? 'blur-xl' : ''
              } cursor-pointer`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary">
                <UploadIcon
                  className="h-6 w-6 text-foreground"
                  strokeWidth={1.5}
                />
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
                onClick={onButtonClick}
              >
                Browse files
              </button>

              <p className="mt-3 text-xs text-muted-foreground">
                MP4, MOV, or MKV · up to 8GB
              </p>
            </div>
          )}

          {file && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClickUpload();
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
                      onClick={onButtonClick}
                      disabled={isUploading}
                      className="cursor-pointer text-xs"
                    >
                      Change
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={handleRemoveFile}
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
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  disabled={isUploading}
                  className="h-10 bg-secondary/20 text-sm focus-visible:bg-secondary/40"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Defaults to the filename. You can change this before
                  uploading.
                </p>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="req"
                  onChange={() => setTicked((prev) => !prev)}
                  checked={ticked}
                  disabled={isUploading}
                />
                <label htmlFor="req" className="text-neutral-400">
                  I agree that the uploaded video is not a Copyrighted or
                  Licensed work. If infringed, The Sole Responsibility is mine
                  to bear.
                </label>
              </div>

              {/* Progress */}
              {isUploading && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Uploading…</span>
                    <span className="tabular-nums text-foreground">
                      {progress}%
                    </span>
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
                    onClick={cancel}
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
          )}

          <div className="bg-secondary/40 py-2">
            <Sprockets />
          </div>
        </div>

        {/* Restriction note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Ban className="h-3.5 w-3.5" strokeWidth={1.5} />
          No copyrighted or licensed content — rooms are private, but uploads
          are still your responsibility.
        </div>

        {/* What happens next */}
        <div className="mt-12">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            What happens after you upload
          </h2>

          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex items-start gap-4 px-5 py-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
