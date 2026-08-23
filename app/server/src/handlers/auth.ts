import type { CreateUser } from "@watchparty/shared/types";
import type { Request, Response } from "express";
import { loginProcess } from "../processes/auth";
import { env } from "../env";

export async function login(req: Request, res: Response) {
    let data = req.body as CreateUser;

    let result = await loginProcess(data);
    let { value: token } = result;

    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }

    res.cookie("login", token, {
        httpOnly: true,
        signed: true,
        secure: env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({ token });
}

export async function logout(req: Request, res: Response) {
    res.clearCookie("login");
    return res.status(200).json({});
}
