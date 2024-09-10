
import { Request,Response } from "express";
import { container } from "tsyringe";
import PostService from "../services/postService";
import Util from "../utils/util";
export default class PostController{
    static async getPost(_:Request, res:Response):Promise<void>{
        try{
            const postService = container.resolve(PostService);
            const getPosts = await postService.getPost();
            res.status(200).json({message: "Posts found", posts: getPosts});
        }catch(error){
            res.status(404).json({message: "Posts not found", error})
        }
    }

    static async getPostById(req:Request, res:Response):Promise<void>{
        try{
            const {id} = req.params;
            if(!id)res.status(500).json({message: "Is necesary params id"});

            const postService = container.resolve(PostService);
            const getPost = await postService.getPostById(parseInt(req.params.id));
            res.status(200).json({message: "Post found", post: getPost})
        }catch(error){
            res.status(404).json({message: "Post not found", error})
        }
    }

    static async createPost(req:Request, res:Response):Promise<void>{
        try{
            const {title,description,user_id} = req.body;
            const dataVerify = Util.verifyData(title,description,user_id);
            if(!dataVerify){
                res.status(400).json({message: "Is necesary all params title,description, user_id"});
                return;
            }
            const postService = container.resolve(PostService);
            const createdPost = await postService.createPost({title,description,user_id});
            res.status(201).json({message: "Created post correctly", post: createdPost});
        }catch(error){
            res.status(404).json({message: "Error to create post", error})
        }
    }

    static async updatePost(req:Request, res:Response):Promise<void>{
        try{
            const {id} = req.params;
            const {title,description,user_id} = req.body;
            const dataVerify = Util.verifyData(title,description,user_id);
            if(!dataVerify){
                res.status(400).json({message: "Is necesay all params title,description,user_id"});
                return;
            };
            const postService = container.resolve(PostService);
            await postService.updatePost(parseInt(id), {title,description,user_id});
            res.status(200).json({message: "Updated post correctly"});
        }catch(error){
            res.status(404).json({message: "Post not found"});
        }
    }

    static async deletePost(req:Request, res:Response):Promise<void>{
        try{
            const {id} = req.params;
            const postService = container.resolve(PostService);
            await postService.deletePost(parseInt(id));
            res.status(200).json({message: "Deleted post correctly"});
        }catch(error){
            res.status(404).json({message: "Post not found"})
        }
    }
}