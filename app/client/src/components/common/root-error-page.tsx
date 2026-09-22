import { useState } from 'react';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { RotateCcw, Home, ChevronDown, ChevronUp } from 'lucide-react';

export function RootErrorPage({ error, reset }: ErrorComponentProps) {
  const [showDetails, setShowDetails] = useState(false);

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected application error occurred.';

  const errorStack = error instanceof Error ? error.stack : null;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#111214] px-6 py-16 text-foreground">
      <div className="w-full max-w-xl">
        {/* Signature graphic: broken line with pulse glyph */}
        <svg
          viewBox="0 0 240 40"
          className="mb-10 w-40 text-red-500 sm:w-48"
          aria-hidden="true"
        >
          <path
            d="M2 20 H90 L100 8 L110 32 L120 14 L130 20 H160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="160" cy="20" r="3" fill="currentColor" />
          <path
            d="M172 20 H200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        <p className="mb-3 text-2xl tracking-wide text-red-400/80">
          Playback Interrupted
        </p>

        <h1 className="mb-6 font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-neutral-100">
          Something went wrong.
        </h1>

        <p className="mb-8 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
          The application hit an unexpected error while loading this screen. You
          can try refreshing this view or head back to the home page.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-neutral-100 px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-300"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>

          <a
            href="/"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
          >
            <Home className="h-4 w-4" />
            Go to homepage
          </a>
        </div>

        {/* Expandable technical details */}
        <div className="mt-10 border-t border-neutral-800/80 pt-6">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex cursor-pointer items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-400"
          >
            <span>{showDetails ? 'Hide' : 'Show'} technical details</span>
            {showDetails ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>

          {showDetails && (
            <div className="mt-3 overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950/80 p-4 font-mono text-xs text-neutral-400">
              <p className="font-semibold text-red-400">{errorMessage}</p>
              {errorStack && (
                <pre className="mt-2 whitespace-pre-wrap text-[11px] text-neutral-500">
                  {errorStack}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
