export interface LibraryVideo {
  id: string;
  title: string;
  duration: number;
  tone: string;
  expiresInMin: number;
}

export interface ActiveRoom {
  title: string;
  host: string;
  isYours: boolean;
  guests: string[];
}
