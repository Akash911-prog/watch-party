import { cn } from '@/lib/utils'; // adjust import path as needed

interface ToggleProps {
  isActive: boolean;
  className?: string;
  onClick?: () => void;
  size?: number; // px, defaults to original design size
  strokeColor?: string; // any valid CSS color, defaults to white
}

export default function Toggle({
  isActive,
  className,
  onClick,
  size = 70,
  strokeColor = '#ffffff',
}: ToggleProps) {
  const scale = size / 70;

  const thick = 40 * scale; // full-length line width
  const topThin = 25 * scale; // top line width when inactive
  const bottomThin = 15 * scale; // bottom line width when inactive
  const left = 15 * scale; // left offset for top/bottom lines
  const offsetY = 15 * scale; // vertical offset for top/bottom lines
  const slideX = 60 * scale; // middle line's active translateX
  const lineHeight = Math.max(2 * scale, 1); // keep it visible at small sizes

  return (
    <div
      className={cn(
        'relative rounded-full',
        'flex items-center justify-center cursor-pointer overflow-hidden',
        className,
      )}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {/* top line */}
      <span
        className={cn(
          'absolute rounded cursor-pointer transition-all duration-500',
          isActive && 'delay-[125ms]',
        )}
        style={{
          height: lineHeight,
          left,
          width: isActive ? thick : topThin,
          backgroundColor: strokeColor,
          transform: isActive
            ? 'translateY(0px) rotate(45deg)'
            : `translateY(-${offsetY}px)`,
        }}
      />
      {/* bottom line */}
      <span
        className={cn(
          'absolute rounded cursor-pointer transition-all duration-500',
          isActive && 'delay-[125ms]',
        )}
        style={{
          height: lineHeight,
          left,
          width: isActive ? thick : bottomThin,
          backgroundColor: strokeColor,
          transform: isActive
            ? 'translateY(0px) rotate(315deg)'
            : `translateY(${offsetY}px)`,
        }}
      />
      {/* middle line */}
      <span
        className="absolute rounded cursor-pointer transition-all duration-500"
        style={{
          height: lineHeight,
          width: thick,
          backgroundColor: strokeColor,
          transform: isActive ? `translateX(${slideX}px)` : 'translateX(0px)',
        }}
      />
    </div>
  );
}
