import { Router } from "express";
import { login, logout } from "../handlers/auth";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
