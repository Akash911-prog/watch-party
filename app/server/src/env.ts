// src/env.ts
import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    CA_CERTIFICATE: z.string(),
    JWT_SECRET: z.string(),
});

// Validate once, at startup
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(z.treeifyError(parsed.error).errors);
    process.exit(1);
}

export const env = parsed.data;

console.log(` ✅ environment variables loaded`);
