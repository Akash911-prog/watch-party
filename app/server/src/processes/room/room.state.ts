import type { RoomState } from "./room.types";

export class RoomsMap {
    private _rooms: Map<string, RoomState>;

    constructor() {
        this._rooms = new Map();
    }

    get rooms() {
        return this._rooms;
    }

    getRoom(roomId: string) {
        let room = this._rooms.get(roomId);
        if (!room) return null;
        return room;
    }

    addRoom(roomId: string, room: RoomState) {
        this._rooms.set(roomId, room);
    }

    removeRoom(roomId: string) {
        this._rooms.delete(roomId);
    }

    updateRoom(roomId: string, room: RoomState) {
        this._rooms.set(roomId, room);
    }

    clear() {
        this._rooms.clear();
    }

    get size() {
        return this._rooms.size;
    }
}
