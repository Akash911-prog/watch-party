import { videoMetadataSchema } from "../schemas";
import type { z } from "zod";

export type accessTokenReq = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    refresh_token_expires_in: number;
};

export type VideoMetadata = z.infer<typeof videoMetadataSchema>;
