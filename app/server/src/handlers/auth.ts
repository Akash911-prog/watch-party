import type { PostUser } from "@watchparty/shared/types";
import type { Request, Response } from "express";
import { loginProcess } from "../processes/auth";
import { env } from "../env";

export async function login(req: Request, res: Response) {
    let data = req.body as PostUser;

    let [token, error] = await loginProcess(data);

    if (error == null) {
        res.cookie("login", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json(token);
    }
    return res.status(error.code).json(error);
}

export async function logout(req: Request, res: Response) {}
