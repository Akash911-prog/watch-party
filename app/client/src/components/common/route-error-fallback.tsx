import { useState } from 'react';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { AlertCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RouteErrorFallback({ error, reset }: ErrorComponentProps) {
  const [showDetails, setShowDetails] = useState(false);

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected error occurred while loading this page.';

  const errorStack = error instanceof Error ? error.stack : null;

  return (
    <div className="mx-auto my-8 max-w-2xl px-4 text-foreground">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Unable to load this section
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{errorMessage}</p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={() => reset()}
                className="cursor-pointer gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                className="cursor-pointer"
              >
                Go back
              </Button>
            </div>

            {/* Technical details toggle */}
            <div className="mt-6 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{showDetails ? 'Hide' : 'Show'} error details</span>
                {showDetails ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {showDetails && (
                <div className="mt-3 overflow-x-auto rounded-md border border-border bg-secondary/30 p-3 font-mono text-xs text-muted-foreground">
                  <p className="font-semibold text-destructive">
                    {errorMessage}
                  </p>
                  {errorStack && (
                    <pre className="mt-2 whitespace-pre-wrap text-[11px]">
                      {errorStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
