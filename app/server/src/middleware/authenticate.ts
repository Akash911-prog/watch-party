import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../processes/auth";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.signedCookies.login;

    let result = verifyToken(token);

    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    req.user = result.value;
    next();
}
