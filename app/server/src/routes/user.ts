import router from "express";
import { validate } from "../middleware/validate";
import { deleteUserSchema, postUserSchema } from "@watchparty/shared/schemas";
import { deleteUser, getUser, patchUser, postUser } from "../handlers/user";

const userRouter = router();

userRouter.post("/", validate(postUserSchema), postUser);

userRouter.get("/", getUser);

userRouter.patch("/", patchUser);

userRouter.delete("/", validate(deleteUserSchema), deleteUser);

export default userRouter;
