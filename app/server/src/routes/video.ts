import { Router } from "express";
import { getUploadUrl } from "../handlers/video";
import { authenticate } from "../middleware/authenticate";
import { videoMetadataRequestSchema } from "@watchparty/shared/schemas";
import { validate } from "../middleware/validate";

const videoRouter = Router();

videoRouter.use(authenticate);

videoRouter.get("/", (req, res) => {});

videoRouter.post("/", (req, res) => {});

videoRouter.delete("/", (req, res) => {});

videoRouter.put("/", (req, res) => {});

videoRouter.post("/upload", validate(videoMetadataRequestSchema), getUploadUrl);

export default videoRouter;
