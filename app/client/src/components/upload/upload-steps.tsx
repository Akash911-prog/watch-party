import { Film, Clock, Users } from 'lucide-react';
import type { UploadStep } from './types';

const defaultSteps: UploadStep[] = [
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

interface UploadStepsProps {
  steps?: UploadStep[];
}

export function UploadSteps({ steps = defaultSteps }: UploadStepsProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        What happens after you upload
      </h2>

      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex items-start gap-4 px-5 py-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-medium flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
