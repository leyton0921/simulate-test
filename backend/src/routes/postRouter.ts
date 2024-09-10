import { Router } from "express";
import PostController from "../controllers/postController";

const postRouter:Router = Router();
postRouter.get("/", PostController.getPost);
postRouter.get("/:id", PostController.getPostById);
postRouter.post("/", PostController.createPost);
postRouter.put("/:id", PostController.updatePost);
postRouter.delete("/:id", PostController.deletePost);
export default postRouter;