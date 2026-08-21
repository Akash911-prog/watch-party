// src/lib/prisma.ts
import { env } from "../env";
import { PrismaClient } from "../generated/prisma/client"; // note: import from your output path, not '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: true, ca: env.CA_CERTIFICATE },
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
