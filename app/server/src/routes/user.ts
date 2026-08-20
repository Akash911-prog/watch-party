import router from "express";

const userRouter = router();

userRouter.post("/user", (req, res) => {
    res.send("user");
});

userRouter.get("/user", (req, res) => {
    res.send("user");
});

userRouter.patch("/user", (req, res) => {
    res.send("user");
});

userRouter.delete("/user", (req, res) => {
    res.send("user");
});

export default userRouter;
