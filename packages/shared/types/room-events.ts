export const EventType = {
    PLAY: "play",
    PAUSE: "pause",
    SEEK: "seek",
    VOLUME: "volume",
    MUTE: "mute",
    UNMUTE: "unmute",
    JOIN: "join",
    LEAVE: "leave",
} as const;

export interface PlayEvent {
    type: typeof EventType.PLAY;
    payload: {};
}

export interface PauseEvent {
    type: typeof EventType.PAUSE;
    payload: {};
}

export interface SeekEvent {
    type: typeof EventType.SEEK;
    payload: {
        seekTime: number;
    };
}

export interface VolumeEvent {
    type: typeof EventType.VOLUME;
    payload: {
        volume: number;
    };
}

export interface MuteEvent {
    type: typeof EventType.MUTE;
    payload: {};
}

export interface UnmuteEvent {
    type: typeof EventType.UNMUTE;
    payload: {};
}

export interface JoinEvent {
    type: typeof EventType.JOIN;
    payload: {
        memberId: string;
        roomId: string;
    };
}

export interface LeaveEvent {
    type: typeof EventType.LEAVE;
    payload: {
        memberId: string;
        roomId: string;
    };
}

export type RoomEvent =
    | PlayEvent
    | PauseEvent
    | SeekEvent
    | VolumeEvent
    | MuteEvent
    | UnmuteEvent
    | JoinEvent
    | LeaveEvent;
