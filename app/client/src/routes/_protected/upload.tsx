import { createFileRoute } from '@tanstack/react-router';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ChangeEvent,
} from 'react';
import { Sprockets } from '@/components/common/sprockets';
import {
  UploadHeader,
  UploadIntro,
  UploadDropzone,
  UploadForm,
  UploadPolicyNotice,
  UploadSteps,
} from '@/components/upload';
import type {
  Video,
  VideoMetadata,
  VideoResource,
} from '@watchparty/shared/types';
import { api } from '@/lib/api-client';
import { useVideoUpload } from '@/hooks/use-video-uploader';
import { toast } from 'sonner';

export const Route = createFileRoute('/_protected/upload')({
  component: UploadRouteComponent,
});

function UploadRouteComponent() {
  const [ticked, setTicked] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [video, setVideo] = useState<VideoResource | null>(null);

  const { upload, progress, isUploading, error, cancel } =
    useVideoUpload<VideoResource>();

  const inputRef = useRef<HTMLInputElement>(null);

  // Surface errors coming from the upload hook or local state
  const displayErrorMessage =
    errorMessage ?? (error ? 'Upload failed. Please try again.' : null);

  const handleSelectedFile = (selectedFile: File) => {
    if (isUploading) return;
    setFile(selectedFile);
    setErrorMessage(null);
    setDone(false);
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
    setTitle(nameWithoutExt || selectedFile.name);
  };

  const handleRemoveFile = useCallback(() => {
    if (isUploading) return;
    setFile(null);
    setTitle('');
    setErrorMessage(null);
    setDone(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [isUploading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    handleSelectedFile(selected);
  };

  function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(v.duration);
      };
      v.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Could not read video metadata'));
      };
      v.src = url;
    });
  }

  const onButtonClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  const onClickUpload = async () => {
    if (!file || isUploading) return;

    setErrorMessage(null);
    setDone(false);

    const metadata: VideoMetadata = {
      title,
      size: file.size,
      mimeType: file.type,
    };

    // 1. Create the session on the server
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

    // 2. Send the bytes. The hook stores the error (and ignores user cancels)
    try {
      const newVideo = await upload(uploadUrl, file);
      setVideo(newVideo);
      setDone(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!done || !video || !file) {
      return;
    }

    async function registerVideo(uploadedVideo: VideoResource, file: File) {
      try {
        const duration = await getVideoDuration(file);
        await api.post<Video>('/video/register', {
          youtubeId: uploadedVideo.id,
          title: uploadedVideo.snippet.title,
          duration: duration,
        });
        toast.success('Video uploaded successfully');
      } catch (e) {
        toast.error('Failed to upload video');
        console.error(e);
      }
    }

    registerVideo(video, file);

    if (done) {
      setTimeout(() => {
        handleRemoveFile();
      }, 100);
    }
  }, [done, handleRemoveFile, video, file]);

  return (
    <div className="dark min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto px-6 py-8">
        <UploadHeader userLetter="A" />
        <UploadIntro />

        {/* Dropzone / Upload Form Container */}
        <div
          className={`overflow-hidden rounded-lg border bg-card transition-colors ${
            file ? 'border-solid border-border' : 'border-dashed border-border'
          }`}
        >
          <div className="bg-secondary/40 py-2">
            <Sprockets count={14} className="px-3" />
          </div>

          <input
            type="file"
            className="hidden"
            accept="video/*"
            ref={inputRef}
            onChange={handleFileChange}
          />

          {!file ? (
            <UploadDropzone
              onFileSelect={handleSelectedFile}
              onBrowseClick={onButtonClick}
            />
          ) : (
            <UploadForm
              file={file}
              title={title}
              onTitleChange={setTitle}
              ticked={ticked}
              onTickedChange={setTicked}
              isUploading={isUploading}
              progress={progress}
              errorMessage={displayErrorMessage}
              done={done}
              onChangeFile={onButtonClick}
              onRemoveFile={handleRemoveFile}
              onSubmit={onClickUpload}
              onCancel={cancel}
            />
          )}

          <div className="bg-secondary/40 py-2">
            <Sprockets count={14} className="px-3" />
          </div>
        </div>

        <UploadPolicyNotice />
        <UploadSteps />
      </div>
    </div>
  );
}
