import { z } from "zod";
import { requestSchema } from "./user";
// snippet: {
//     title: 'My video title',
//     description: 'My video description',
//     tags: ['tag1', 'tag2'],
//     categoryId: '22' // People & Blogs, see YouTube category IDs
//   },
//   status: {
//     privacyStatus: 'private' // or 'public', 'unlisted'
//   }

export const videoMetadataSchema = z.object({
    title: z.string(),
    description: z.string().default("uploaded from watch party").optional(),
    tags: z.array(z.string()).default([]).optional(),
    categoryId: z.string().default("22").optional(),
    size: z.number().default(0).optional(),
    mimeType: z.string().default("video/mp4").optional(),
});

export const videoMetadataSchemaYt = z.object({
    snippet: z.object({
        title: z.string(),
        description: z.string().default("uploaded from watch party").optional(),
        tags: z.array(z.string()).default([]).optional(),
        categoryId: z.string().default("22").optional(),
    }),
    status: z
        .object({
            privacyStatus: z
                .string()
                .refine((status) => ["private", "unlisted"].includes(status), {
                    message: "Invalid privacy status",
                })
                .optional(),
        })
        .default({ privacyStatus: "private" })
        .optional(),
});

export const videoMetadataRequestSchema = requestSchema(videoMetadataSchema);
