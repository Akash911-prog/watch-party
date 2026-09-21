export interface LibraryVideo {
  title: string;
  duration: string;
  tone: string;
  expiresInMin: number;
}

export interface ActiveRoom {
  title: string;
  host: string;
  isYours: boolean;
  guests: string[];
}
