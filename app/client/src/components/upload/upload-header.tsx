import { Link } from '@tanstack/react-router';
import { Avatar } from '@/components/common/avatar';

interface UploadHeaderProps {
  userLetter?: string;
}

export function UploadHeader({ userLetter = 'A' }: UploadHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-10">
      <Link to="/" className="text-xl font-bold tracking-tight">
        Showtime
      </Link>
      <Avatar letter={userLetter} size={32} />
    </header>
  );
}
