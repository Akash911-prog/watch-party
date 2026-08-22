import type { PostUser, UserPayload } from "@watchparty/shared/types";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { Err, Ok, type AppError, type Result } from "@watchparty/shared/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const loginProcess = async (data: PostUser) => {
    let { username, password } = data;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return Err({
                code: 404,
                name: "NotFoundError",
                message: "User not found",
                error: null,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return Err({
                code: 401,
                name: "UnauthorizedError",
                message: "Invalid credentials",
                error: null,
            });
        }

        let token = jwt.sign(
            {
                username: user.username,
                id: user.id,
            },
            env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        return Ok(token);
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
            message: "Server error",
        });
    }
};

export const verifyToken = (token: string) => {
    if (!token) {
        return Err({
            code: 401,
            name: "UnauthorizedError",
            message: "No Bearer Token provided",
            error: null,
        });
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as UserPayload;

        return Ok(payload);
    } catch (error) {
        return Err({
            code: 401,
            name: "UnauthorizedError",
            message: "Invalid or expired token",
            error,
        });
    }
};
