import {Router} from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import likeRouter from "./likeRouter";

const routes:Router = Router();
routes.use("/auth", authRouter);
routes.use("/users/", userRouter);
routes.use("/posts", postRouter);
routes.use("/likes", likeRouter);
export default routes;