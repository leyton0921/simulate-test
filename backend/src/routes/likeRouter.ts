import { Router } from "express";
import LikeController from "../controllers/likeController";

const likeRouter:Router = Router();
likeRouter.get("/",LikeController.getLikes);
likeRouter.get("/:id", LikeController.getLikeById);
likeRouter.post("/", LikeController.createLike);
likeRouter.put("/:id", LikeController.updateLike);
likeRouter.delete("/:id", LikeController.deleteLike)
export default likeRouter;