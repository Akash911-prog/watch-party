import type { Request, Response } from "express";
import type { UsernameQuery, CreateUser } from "@watchparty/shared/types";
import {
    deleteUserProcess,
    getUserProcess,
    registerUserProcess,
} from "../processes/user";

export async function postUser(req: Request, res: Response) {
    const body = req.body as CreateUser;
    const result = await registerUserProcess(body);
    if (result.ok) {
        console.log(result.value);
        return res.status(201).json(result.value);
    }
    return res.status(result.error.code).json(result.error);
}

export async function getUser(req: Request, res: Response) {
    let user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }

    let result = await getUserProcess({ username: user.username });

    if (result.ok) {
        return res.status(200).json(result.value);
    }

    return res.status(result.error.code).json(result.error);
}

export async function patchUser(req: Request, res: Response) {
    return new Response("user");
}

export async function deleteUser(req: Request, res: Response) {
    const body = req.body as UsernameQuery;
    let result = await deleteUserProcess(body);

    if (result.ok) {
        return res.status(200).json(result.value);
    }
    return res.status(result.error.code).json(result.error);
}
