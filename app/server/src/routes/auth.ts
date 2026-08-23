import { Router } from "express";
import { login, logout, verify } from "../handlers/auth";
import { authenticate } from "../middleware/authenticate";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.use(authenticate);
authRouter.post("/logout", logout);
authRouter.get("/verify", verify);

export default authRouter;
