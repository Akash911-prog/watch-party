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

export const createVideoSchema = z.object({
    youtubeId: z.string(),
    title: z.string(),
    duration: z.number().default(0).optional(),
});

export const postVideoSchema = requestSchema(createVideoSchema);

export const videoSchema = z.object({
    id: z.string(),
    youtubeId: z.string(),
    title: z.string(),
    duration: z.number().default(0),
    createdAt: z.date(),
    expiresAt: z.date().optional(),
    uploadedBy: z.string(),
    rooms: z.array(z.string()),
});

const Thumbnail = z.object({
    url: z.url(),
    width: z.number().int(),
    height: z.number().int(),
});

export const videoResource = z.object({
    kind: z.literal("youtube#video"),
    etag: z.string(),
    id: z.string(),
    snippet: z.object({
        publishedAt: z.date(),
        channelId: z.string(),
        channelTitle: z.string(),
        title: z.string(),
        description: z.string(),
        categoryId: z.string(),
        liveBroadcastContent: z.enum(["none", "upcoming", "live"]),
        thumbnails: z.object({
            default: Thumbnail,
            medium: Thumbnail,
            high: Thumbnail,
            standard: Thumbnail.optional(),
            maxres: Thumbnail.optional(),
        }),
        localized: z.object({
            title: z.string(),
            description: z.string(),
        }),
    }),
    status: z.object({
        uploadStatus: z.enum([
            "uploaded",
            "processed",
            "failed",
            "rejected",
            "deleted",
        ]),
        privacyStatus: z.enum(["public", "unlisted", "private"]),
        license: z.enum(["youtube", "creativeCommon"]),
        embeddable: z.boolean(),
        publicStatsViewable: z.boolean(),
    }),
});
