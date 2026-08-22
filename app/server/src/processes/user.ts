import { Prisma } from "../generated/prisma/client"; // or wherever your client is generated
import type { UsernameQuery, CreateUser } from "@watchparty/shared/types";
import { Err, Ok } from "@watchparty/shared/errors";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";

export const registerUserProcess = async (data: CreateUser) => {
    const { username, password } = data;
    const hash = await bcrypt.hash(password, 12);

    try {
        const user = await prisma.user.create({
            data: { username, password: hash },
        });

        let { password: _, ...userWithoutPassword } = user;
        return Ok(userWithoutPassword);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    return Err({
                        code: 409,
                        name: "ConflictError",
                        error,
                        message: "User already exists",
                    });
                default:
                    return Err({
                        code: 500,
                        name: "InternalError",
                        error,
                        message: "Database error",
                    });
            }
        }

        // fallback for genuinely unexpected errors (non-Prisma)
        return Err({
            code: 500,
            name: "InternalError",
            error,
            message: "Unexpected error",
        });
    }
};

export const deleteUserProcess = async (data: UsernameQuery) => {
    const { username } = data;
    try {
        const user = await prisma.user.delete({ where: { username } });
        let { password: _, ...userWithoutPassword } = user;
        return Ok(userWithoutPassword);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    return Err({
                        code: 404,
                        name: "NotFoundError",
                        error,
                        message: "User not found",
                    });
                default:
                    return Err({
                        code: 500,
                        name: "InternalError",
                        error,
                        message: "Database error",
                    });
            }
        }

        // fallback for genuinely unexpected errors (non-Prisma)
        return Err({
            code: 500,
            name: "InternalError",
            error,
            message: "Unexpected error",
        });
    }
};

export const getUserProcess = async (data: UsernameQuery) => {
    const { username } = data;
    try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return Err({
                code: 404,
                name: "NotFoundError",
                message: "User not found",
                error: null,
            });
        }

        let { password: _, ...userWithoutPassword } = user;
        return Ok(userWithoutPassword);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return Err({
                code: 500,
                name: "InternalError",

                error,
                message: "Database error",
            });
        }

        // fallback for genuinely unexpected errors (non-Prisma)
        return Err({
            code: 500,
            name: "InternalError",
            error,
            message: "Unexpected error",
        });
    }
};
