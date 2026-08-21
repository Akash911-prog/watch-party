import express, { type Express, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./routes/user";
import { env } from "./env";

const app: Express = express();
const port = env.PORT;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(helmet() as any);
app.use(
    cors({
        origin: ["http://localhost:5173", "http://192.168.0.101:5173/"],
        credentials: true,
    }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(` ✅ server started in ${env.NODE_ENV} mode on port ${port}`);
});
