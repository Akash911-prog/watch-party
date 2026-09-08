import { Err, Ok } from "@watchparty/shared/errors";
import type { VideoMetadata, VideoMetadataYt } from "@watchparty/shared/types";
import { google } from "googleapis";
import { env } from "../env";

export const getUploadUrlProcess = async (
    accessToken: string,
    metadata: VideoMetadata,
) => {
    let res = await getUploadUrlProcessYt(accessToken, metadata);
    return res;
};

export const getUploadUrlProcessYt = async (
    accessToken: string,
    metadata: VideoMetadata,
) => {
    const mimeType = metadata.mimeType;
    const metadataYt = {
        snippet: {
            title: metadata.title,
            description: metadata.description,
            tags: metadata.tags,
            categoryId: metadata.categoryId,
        },
        status: {
            privacyStatus: "unlisted",
        },
    } as VideoMetadataYt;

    let res: Response;

    try {
        res = await fetch(
            "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json; charset=UTF-8",
                    "X-Upload-Content-Type": mimeType,
                    "X-Upload-Content-Length": metadata.size
                        ? metadata.size.toString()
                        : "0",
                },
                body: JSON.stringify(metadataYt),
            },
        );
    } catch (e) {
        console.log(e);
        return Err({
            code: 500,
            name: "InternalError",
            message: "Failed to init upload",
            error: e,
        });
    }

    if (!res.ok) {
        const body = await res.text().catch(() => undefined);

        switch (res.status) {
            case 401:
                return Err({
                    code: 401,
                    name: "UnauthorizedError",
                    message: "Access token invalid or expired",
                    error: body,
                });
            case 403:
                return Err({
                    code: 403,
                    name: "ForbiddenError",
                    message: "Insufficient scope or quota exceeded",
                    error: body,
                });
            case 400:
                return Err({
                    code: 400,
                    name: "ValidationError",
                    message: "Invalid metadata or request format",
                    error: body,
                });
            case 404:
                return Err({
                    code: 404,
                    name: "NotFoundError",
                    message: "Resource not found",
                    error: body,
                });
            case 429:
                return Err({
                    code: 429,
                    name: "TooManyRequestsError",
                    message: "Too many requests, back off and retry",
                    error: body,
                });
            default:
                return Err({
                    code: 500,
                    name: "InternalError",
                    message: `Failed to init upload (status ${res.status})`,
                    error: body,
                });
        }
    }

    const uploadUrl = res.headers.get("location");

    if (!uploadUrl) {
        return Err({
            code: 500,
            name: "InternalError",
            message: "Upload initiated but no Location header returned",
            error: undefined,
        });
    }

    return Ok(uploadUrl);
};
