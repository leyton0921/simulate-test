
import "reflect-metadata";
import { container } from "tsyringe";
import UserService from "../services/userService";
import User from "../models/userModel";
import AuthService from "../services/authService";
import PostService from "../services/postService";
import Post from "../models/postModel";
import Like from "../models/likeModel";
import LikeService from "../services/likeService";

container.registerSingleton<User>(User);
container.registerSingleton<AuthService>(AuthService);
container.registerSingleton<UserService>(UserService);
container.registerSingleton<Post>(Post);
container.registerSingleton<PostService>(PostService);
container.registerSingleton<Like>(Like);
container.registerSingleton<LikeService>(LikeService);
