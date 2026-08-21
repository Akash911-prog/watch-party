import { z } from "zod";

const usernameRegex =
    /^[a-zA-Z0-9_](?!.*[_.-]{2})[a-zA-Z0-9_.-]{1,18}[a-zA-Z0-9_]$/;

// Shared field-level schemas
const usernameSchema = z
    .string()
    .regex(usernameRegex, {
        error: "Username cannot contain special characters and spaces",
    })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters");

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters");

// Auth form schemas
export const loginFormSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
});

export const signupFormSchema = z
    .object({
        username: usernameSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords and confirm password must match",
        path: ["confirmPassword"],
    });

// API request schemas
export const postUserSchema = z.object({
    body: loginFormSchema,
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export const deleteUserSchema = z.object({
    body: z.object({
        username: usernameSchema,
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type SignupFormValues = z.infer<typeof signupFormSchema>;
