import { Router } from "express";
import { getAllVideos, getUploadUrl, registerVideo } from "../handlers/video";
import { authenticate } from "../middleware/authenticate";
import {
    postVideoSchema,
    videoMetadataRequestSchema,
} from "@watchparty/shared/schemas";
import { validate } from "../middleware/validate";

const videoRouter = Router();

videoRouter.use(authenticate);

videoRouter.get("/", getAllVideos);

videoRouter.post("/register", validate(postVideoSchema), registerVideo);

videoRouter.delete("/", (req, res) => {});

videoRouter.post("/upload", validate(videoMetadataRequestSchema), getUploadUrl);

export default videoRouter;
