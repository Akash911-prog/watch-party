import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

export const Route = createFileRoute('/_unprotected/contact')({
  component: RouteComponent,
});

// Same word-by-word scroll color reveal used on the About page.
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
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = text.split(' ');

  return (
    <p ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
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

// A single contact row: small label on the left (or above, on mobile),
// big link text on the right that underlines on hover.
function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group block border-t border-white/10 py-8 md:py-10"
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
        <span className="text-sm text-white/50 md:w-40 shrink-0">{label}</span>
        <span className="text-3xl md:text-6xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
          <span className="bg-bottom-left bg-linear-to-r from-white to-white bg-size-[0%_1px] bg-no-repeat group-hover:bg-size-[100%_1px] transition-[background-size] duration-500 ease-out pb-1">
            {value}
          </span>
        </span>
      </div>
    </a>
  );
}

function RouteComponent() {
  return (
    <div className="bg-black text-white min-h-screen w-full py-24 md:py-32">
      {/* Hero */}
      <section className="w-screen min-h-screen px-10 flex flex-col justify-center">
        <h2 className="text-center text-6xl md:text-[250px] font-bold tracking-tight mb-10 leading-none">
          CONTACT
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-sm text-white/70">Get in touch</span>
        </div>
        <ScrollColorParagraph
          className="text-center leading-relaxed md:tracking-wider md:max-w-4xl max-w-4xl mx-auto md:text-4xl text-lg"
          text="Questions, feedback, or something broke mid-movie — we want to hear about it. Reach out however's easiest and we'll get back to you."
        />
      </section>

      {/* Info list */}
      <section className="px-10 md:px-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-sm text-white/70">Reach us</span>
        </div>

        <div className="max-w-5xl">
          <ContactRow
            label="Email"
            value="akashsamanta0571@gmail.com"
            href="mailto:akashsamanta0571@gmail.com"
          />
          <ContactRow label="Phone" value="+91 7503242769" href="/contact" />
          <ContactRow
            label="Github"
            value="Akash911-prog"
            href="https://github.com/Akash911-prog"
          />
          <div className="border-t border-b border-white/10 py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
              <span className="text-sm text-white/50 md:w-40 shrink-0">
                Based in
              </span>
              <span className="text-3xl md:text-6xl font-bold tracking-tight text-white/90">
                Remote, everywhere
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
