import { useEffect, useState } from 'react';

export function NotFoundPage() {
  const [dashOffset, setDashOffset] = useState(240);

  useEffect(() => {
    const t = setTimeout(() => setDashOffset(0), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#111214] px-6 py-16">
      <div className="w-full max-w-xl">
        {/* Signature element: a path that traces out then breaks off,
            standing in for "the route that couldn't be completed" */}
        <svg
          viewBox="0 0 240 40"
          className="w-40 sm:w-48 mb-10 text-neutral-600"
          aria-hidden="true"
        >
          <path
            d="M2 20 H140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="240"
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
          />
          <circle cx="140" cy="20" r="3" fill="currentColor" />
          <path
            d="M150 20 H180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        <p className="text-2xl tracking-wide text-neutral-500 mb-3">
          Error 404
        </p>

        <h1 className="font-serif text-[clamp(2.75rem,8vw,5rem)] leading-none text-neutral-100 mb-8">
          This page went missing.
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md mb-10">
          The link may be broken, or the page may have been moved. Check the
          address, or head back to somewhere that still exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 bg-neutral-100 text-neutral-900 text-sm rounded-md hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-300"
          >
            Go to homepage
          </a>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-3 border border-neutral-700 text-neutral-300 text-sm rounded-md hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
          >
            Go back
          </button>
        </div>

        <div className="mt-16 pt-6 border-t border-neutral-800">
          <p className="text-xs text-neutral-500">
            If you think this is a mistake, let us know and we'll look into it.
          </p>
        </div>
      </div>
    </div>
  );
}
