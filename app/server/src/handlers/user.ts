import type { Request, Response } from "express";
import type { DeleteUser, PostUser } from "@watchparty/shared/types";
import { deleteUserProccess, registerUserProcess } from "../processes/user";

export async function postUser(req: Request, res: Response) {
    const body = req.body as PostUser;
    const [user, error] = await registerUserProcess(body);
    if (error == null) {
        console.log(user);
        return res.status(201).json(user);
    }
    return res.status(error.code).json(error);
}

export async function getUser(req: Request, res: Response) {
    return res.send("user");
}

export async function patchUser(req: Request, res: Response) {
    return new Response("user");
}

export async function deleteUser(req: Request, res: Response) {
    const body = req.body as DeleteUser;
    let [data, error] = await deleteUserProccess(body);

    if (error == null) {
        return res.status(200).json(data);
    }
    return res.status(error.code).json(error);
}
