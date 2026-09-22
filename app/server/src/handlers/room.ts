import type { Request, Response } from "express";
import {
    createRoomProcess,
    getAllRoomsProcess,
    getRoomProcess,
} from "../processes/room/room.crud";

export const getAllRooms = async (req: Request, res: Response) => {
    let user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    let result = await getAllRoomsProcess(user);
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    return res.status(200).json(result.value);
};

export const createRoom = async (req: Request, res: Response) => {
    let user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    let result = await createRoomProcess(req.body.videoId, user);
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
};

export const getRoom = async (req: Request, res: Response) => {
    let user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    let roomId = req.params.id;
    if (!roomId || roomId instanceof Array) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid room ID" });
    }
    let result = await getRoomProcess(user, roomId);
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    return res.status(200).json(result.value);
};
