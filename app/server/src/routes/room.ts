import { Router } from "express";
import { createRoom, getAllRooms, getRoom } from "../handlers/room";

export const roomRouter = Router();

roomRouter.get("/", getAllRooms);
roomRouter.get("/:id", getRoom);

roomRouter.post("/", createRoom);

export default roomRouter;
