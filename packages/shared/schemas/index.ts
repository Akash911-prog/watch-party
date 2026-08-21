import { z } from "zod";

const usernameRegex =
    /^[a-zA-Z0-9_](?!.*[_.-]{2})[a-zA-Z0-9_.-]{1,18}[a-zA-Z0-9_]$/;

export const postUserSchema = z.object({
    body: z.object({
        username: z.string().regex(usernameRegex).min(3).max(20),
        password: z.string().min(8).max(50),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export const deleteUserSchema = z.object({
    body: z.object({
        username: z.string().regex(usernameRegex).min(3).max(20),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});
