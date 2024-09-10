import {Router} from "express";
import AuthController from "../controllers/authController";

const authRouter:Router = Router();
authRouter.post("/login", AuthController.loginUser);
authRouter.post("/register",AuthController.registerUser);
export default authRouter;