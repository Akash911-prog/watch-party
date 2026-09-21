import {
    createVideoSchema,
    videoMetadataSchema,
    videoMetadataSchemaYt,
    videoResource,
    videoSchema,
} from "../schemas";
import type { z } from "zod";

export type accessTokenReq = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    refresh_token_expires_in: number;
};

export type VideoMetadata = z.infer<typeof videoMetadataSchema>;
export type VideoMetadataYt = z.infer<typeof videoMetadataSchemaYt>;
export type PostVideo = z.infer<typeof createVideoSchema>;
export type Video = z.infer<typeof videoSchema>;

export type VideoResource = z.infer<typeof videoResource>;
