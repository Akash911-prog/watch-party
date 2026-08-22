// packages/shared/types/index.ts — now just infers, never hand-declares shapes that a schema already owns
import type { z } from "zod";
import {
    loginFormSchema,
    deleteUserSchema,
    userPayloadSchema,
    userSchema,
} from "../schemas";

export type CreateUser = z.infer<typeof loginFormSchema>;
export type UsernameQuery = z.infer<typeof deleteUserSchema>["body"]; // used by delete AND get
export type UserPayload = z.infer<typeof userPayloadSchema>;
export type User = z.infer<typeof userSchema>;
