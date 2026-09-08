import type { Request, Response, NextFunction } from "express";

export const consoleLogger = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const time = new Date().toISOString();
        console.log(
            `[${time}] ${req.id} ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
        );
    });

    next();
};
