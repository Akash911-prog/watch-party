export type RoomState = {
    roomId: string;
    videoId: string;
    isPlaying: boolean;
    currentTime: number;
    lastUpdatedAt: number;
    membersId: string[];
};
