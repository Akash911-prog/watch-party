import { Router } from "express";
import { validate } from "../middleware/validate";
import { deleteUserSchema, postUserSchema } from "@watchparty/shared/schemas";
import { deleteUser, getUser, patchUser, postUser } from "../handlers/user";
import { authenticate } from "../middleware/authenticate";

const userRouter = Router();

userRouter.post("/", validate(postUserSchema), postUser);

userRouter.use(authenticate);

userRouter.get("/", getUser);

userRouter.patch("/", patchUser);

userRouter.delete("/", validate(deleteUserSchema), deleteUser);

export default userRouter;
