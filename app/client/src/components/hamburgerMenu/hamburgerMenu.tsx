import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';

interface NavMenuProps {
  isOpen: boolean;
  className?: string;
  onNavigate?: (item: string) => void;
}

const NAV_ITEMS = [
  ['HOME', '/'],
  ['STREAM', '/dashboard'],
  ['ABOUT', '/about'],
  ['CONTACT', '/contact'],
];
const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', href: '#' },
  { label: 'LINKEDIN', href: '#' },
];

// Parent: orchestrates when children start animating relative to each other
const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15, // wait for the panel itself to start sliding in
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1, // reverse order on the way out
    },
  },
};

// Child: each nav item's own animation, driven by the parent's state
const navItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export default function HamburgerMenu({
  isOpen,
  className,
  onNavigate,
}: NavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          className={cn(
            'absolute w-full h-full min-h-[70vh] overflow-hidden rounded-b-2xl',
            'bg-[linear-gradient(160deg,#cfcfd1_0%,#d7d3d4_35%,#dcd6d7_55%,#e3d4d6_75%,#e9d3d8_100%)]',
            'flex flex-col justify-between px-8 pt-24 pb-10',
            className,
          )}
        >
          {/* Nav links */}
          <motion.nav
            className="flex flex-col gap-1"
            variants={navContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item[0]}
                type="button"
                variants={navItem}
                onClick={() => onNavigate?.(item[0])}
                className={cn(
                  'text-left font-semibold tracking-tight text-neutral-900',
                  'text-[2.5rem] leading-[1.35] uppercase',
                  'transition-colors duration-200 hover:text-neutral-500',
                  'focus:outline-none focus-visible:text-neutral-500',
                )}
              >
                <Link to={item[1]}>{item[0]}</Link>
              </motion.button>
            ))}
          </motion.nav>

          {/* Footer row */}
          <div className="flex items-end justify-between">
            <ul className="flex flex-col gap-1">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={cn(
                      'text-[0.7rem] tracking-wide text-neutral-600',
                      'transition-colors duration-200 hover:text-neutral-900',
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-[0.9rem] tracking-wide">
              <Link
                to="/auth"
                type="button"
                className={cn(
                  'transition-colors duration-200 text-neutral-600',
                )}
                onClick={() => onNavigate?.('')}
              >
                Signup
              </Link>
              <span className="text-neutral-400">|</span>
              <Link
                to="/auth"
                type="button"
                className={cn(
                  'transition-colors duration-200 text-neutral-600',
                )}
                onClick={() => onNavigate?.('')}
              >
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
