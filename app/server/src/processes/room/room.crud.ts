import { Ok, Err } from "@watchparty/shared/errors";
import type { UserPayload } from "@watchparty/shared/types";
import { prisma } from "../../prisma";
import { Prisma } from "../../generated/prisma/client";

export const getAllRoomsProcess = async (user: UserPayload) => {
    try {
        const rooms = await prisma.room.findMany({
            where: {
                hostId: user.id,
            },
        });
        return Ok(rooms);
    } catch (error) {
        console.log(error);
        return Err({
            code: 500,
            name: "InternalError",
            message: "Failed to get rooms",
            error,
        });
    }
};

export const createRoomProcess = async (videoId: string, user: UserPayload) => {
    try {
        const newRoom = await prisma.room.create({
            data: {
                videoId: videoId,
                hostId: user.id,
            },
        });

        if (!newRoom) {
            return Err({
                code: 500,
                name: "InternalError",
                message: "Failed to create room",
                error: undefined,
            });
        }

        return Ok(newRoom);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    return Err({
                        code: 409,
                        name: "ConflictError",
                        message: "Room already exists",
                        error,
                    });
                default:
                    return Err({
                        code: 500,
                        name: "InternalError",
                        message: "Database error",
                        error,
                    });
            }
        }
    }
    return Err({
        code: 500,
        name: "InternalError",
        message: "Unexpected error",
        error: undefined,
    });
};

export const getRoomProcess = async (user: UserPayload, roomId: string) => {
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: roomId,
                hostId: user.id,
            },
        });
        return Ok(room);
    } catch (error) {
        console.log(error);
        return Err({
            code: 500,
            name: "InternalError",
            message: "Failed to get room",
            error,
        });
    }
};
