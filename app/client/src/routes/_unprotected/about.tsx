import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

export const Route = createFileRoute('/_unprotected/about')({
  component: RouteComponent,
});

// Renders a paragraph whose words shift from dim to full white as the
// paragraph scrolls through the viewport. Each word gets its own slice of
// the paragraph's local scroll progress, so the color "fills in" left to
// right / top to bottom as you scroll, rather than the whole block
// changing at once.
function ScrollColorParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    // Effect starts once the paragraph is 90% up the viewport, and
    // finishes once it's a quarter of the way up. Tweak these to taste.
    offset: ['start 0.9', 'start 0'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  const words = text.split(' ');

  return (
    <p ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrollWord key={i} progress={progress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
}

function ScrollWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ['#525252', '#ffffff']);
  return (
    <motion.span style={{ color }} className="mr-2 md:mr-3 inline-block">
      {children}
    </motion.span>
  );
}

// Wraps a paragraph so it drifts vertically at a different rate than the
// page as it scrolls past — a classic parallax read.
function ParallaxParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.p ref={ref} style={{ y }} className={className}>
      {children}
    </motion.p>
  );
}

function RouteComponent() {
  return (
    <div className="bg-black text-white min-h-screen w-full py-24 md:py-32">
      <div className="">
        {/* Section header */}
        <section className="w-screen h-screen px-10">
          <h2 className="text-center text-6xl md:text-[250px] font-bold tracking-tight mb-10">
            ABOUT
          </h2>
          {/* The Idea */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-sm text-white/70">The idea</span>
          </div>
          <ScrollColorParagraph
            className="text-center leading-relaxed md:tracking-wider md:max-w-4xl max-w-4xl mx-auto md:text-4xl text-lg"
            text="Watch Party is a place to watch videos with friends without losing quality along the way. You upload the video a movie, a show, whatever create a room, and everyone who joins watches it together, in sync, at the same time. No re-encoding through a screen share, no compression eating the picture. The whole point is keeping playback in sync across everyone in the room, so nobody's ahead or behind."
          />
        </section>
        {/* Why it exists */}
        <section className="md:px-20  w-screen h-screen px-10">
          <div className="grid md:grid-cols-2 md:grid-rows-2 grid-rows-3 gap-4 items-start relative top-1/2 -translate-y-1/2">
            <div className="w-full h-full md:flex justify-end flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-sm text-white/70">Why it exists?</span>
              </div>
              <h3 className="text-lg md:text-6xl font-bold md:leading-15 mb-8 tracking-tight uppercase">
                The picture <span className="text-neutral-400">dropped.</span>
                <br />
                The sound <span className="text-neutral-400">cut out.</span>
              </h3>
            </div>
            <ParallaxParagraph className="text-white/80 leading-relaxed text-md max-w-xl order-3">
              This started because of a bad Google Meet call. A couple of
              friends and I tried watching a movie together over screen share —
              the video quality dropped hard, and on top of that, talking during
              the movie meant either missing dialogue or the movie audio getting
              suppressed every time someone spoke. It made a simple thing — just
              watching something together — annoying enough that I decided to
              build something that actually got it right.
            </ParallaxParagraph>
            <div className="bg-neutral-500 w-full h-full rounded-sm row-span-2" />
          </div>
        </section>
      </div>
    </div>
  );
}
