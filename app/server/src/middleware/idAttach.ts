import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const idAttach = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let id = crypto.randomUUID();
    req.id = id;
    next();
};
