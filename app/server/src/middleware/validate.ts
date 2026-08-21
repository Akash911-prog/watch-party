import { treeifyError, ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
    <T extends ZodObject<any>>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: treeifyError(result.error).errors,
            });
        }

        // result.data is now typed as z.infer<T>, not unknown
        req.body = result.data.body;

        next();
    };
