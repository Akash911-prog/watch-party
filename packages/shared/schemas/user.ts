// packages/shared/schemas/index.ts
import { z } from "zod";

const usernameRegex = /.../;
const usernameSchema = z
    .string()
    .regex(usernameRegex, {
        message: "Username cannot contain spaces and special characters",
    })
    .min(3)
    .max(20);
const passwordSchema = z.string().min(8).max(50);

export const loginFormSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
});
export const signupFormSchema = loginFormSchema
    .extend({ confirmPassword: passwordSchema })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords and confirm password must match",
        path: ["confirmPassword"],
    });

// --- request envelope helper, replaces repeated body/query/params boilerplate ---
export const requestSchema = <B extends z.ZodTypeAny>(body: B) =>
    z.object({
        body,
        query: z.object({}).optional(),
        params: z.object({}).optional(),
    });

const usernameParamSchema = z.object({ username: usernameSchema });

export const postUserSchema = requestSchema(loginFormSchema);
export const deleteUserSchema = requestSchema(usernameParamSchema);

// --- entity schemas (new: single source of truth for User/UserPayload shapes) ---
export const userPayloadSchema = z.object({
    id: z.string(),
    username: usernameSchema,
});
export const userSchema = userPayloadSchema;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type SignupFormValues = z.infer<typeof signupFormSchema>;
