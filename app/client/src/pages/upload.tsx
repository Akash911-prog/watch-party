import { Upload as UploadIcon, Film, Clock, Users, Ban } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useRef, useState } from 'react';

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

export default function UploadPage() {
  const [ticked, setTicked] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  // 2. Handle dropped files
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // 3. Fallback: Handle standard click-to-select files
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
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

        {/* Dropzone */}
        <div className="overflow-hidden rounded-lg border border-dashed border-border bg-card">
          <div className="bg-secondary/40 py-2">
            <Sprockets />
          </div>

          {!file && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
              className={`flex flex-col items-center gap-4 px-8 py-16 text-center ${isDragActive ? 'blur-xl' : ''} cursor-pointer`}
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
                className="mt-2 flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
                onClick={onButtonClick}
              >
                Browse files
              </button>

              <p className="mt-3 text-xs text-muted-foreground">
                MP4, MOV, or MKV · up to 8GB
              </p>

              <input
                type="file"
                className="hidden"
                accept="video/*"
                ref={inputRef}
                onChange={handleFileChange}
              />
            </div>
          )}

          {file && <div>File: {file.name}</div>}

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

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="req"
            onChange={() => setTicked((prev) => !prev)}
            checked={ticked}
          />
          <label htmlFor="req" className="text-neutral-400">
            I agree that the uploaded video is not a Copyrighted or Licensed
            work. If infringed, The Sole Responsibility is mine to bear.
          </label>
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
