import { Err, Ok } from "@watchparty/shared/errors";
import type {
    PostVideo,
    UserPayload,
    VideoMetadata,
    VideoMetadataYt,
} from "@watchparty/shared/types";
import { google } from "googleapis";
import { env } from "../env";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";

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
                    Origin: env.FRONTEND_URL,
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

        console.log(body);

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

export const createVideoProcess = async (
    video: PostVideo,
    userPayload: UserPayload,
) => {
    try {
        const newVideo = await prisma.video.create({
            data: {
                youtubeId: video.youtubeId,
                title: video.title,
                uploadedBy: userPayload.id,
                expiresAt: new Date(Date.now() + 6 * 3600 * 1000), // 6 hours
                duration: video.duration,
            },
        });

        if (!newVideo) {
            return Err({
                code: 500,
                name: "InternalError",
                message: "Failed to create video",
                error: undefined,
            });
        }

        return Ok(newVideo);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    return Err({
                        code: 409,
                        name: "ConflictError",
                        message: "Video already exists",
                        error,
                    });
                default:
                    return Err({
                        code: 500,
                        name: "InternalError",
                        message: "Database error",
                        error,
                    });
            }
        }
    }
    return Err({
        code: 500,
        name: "InternalError",
        message: "Unexpected error",
        error: undefined,
    });
};
