import type { VideoMetadata } from "@watchparty/shared/types";
import type { Request, Response } from "express";
import { getUploadUrlProcess } from "../processes/video";
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
