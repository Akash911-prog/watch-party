import type { PostVideo, VideoMetadata } from "@watchparty/shared/types";
import type { Request, Response } from "express";
import {
    createVideoProcess,
    getAllVideoProcess,
    getUploadUrlProcess,
} from "../processes/video";
import { getAccessToken } from "../lib/yt-server";

export async function getUploadUrl(req: Request, res: Response) {
    let data = req.body as VideoMetadata;
    let result = await getAccessToken();
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    let accessToken = result.value as string;
    let resultReq = await getUploadUrlProcess(accessToken, data);
    if (!resultReq.ok) {
        return res.status(resultReq.error.code).json(resultReq.error);
    }

    return res.status(200).json({ uploadUrl: resultReq.value });
}

export async function registerVideo(req: Request, res: Response) {
    const body = req.body as PostVideo;
    const user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    const result = await createVideoProcess(body, user);
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    return res.status(201).json(result.value);
}

export async function getAllVideos(req: Request, res: Response) {
    const user = req.user;
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    const result = await getAllVideoProcess(user);
    if (!result.ok) {
        return res.status(result.error.code).json(result.error);
    }
    return res.status(201).json(result.value);
}
