import { Request,Response } from "express";
import { container } from "tsyringe";
import LikeService from "../services/likeService";
import Util from "../utils/util";
export default class LikeController{

    static async getLikes(_:Request, res: Response):Promise<void>{
        try{
            const likeService = container.resolve(LikeService);
            const getLikes = await likeService.getLikes();
            if(!getLikes){
                res.status(404).json({message: "Likes not found"});
                return;
            }
            res.status(200).json({message: "Likes found", likes: getLikes})
        }catch(error){
            res.status(404).json({message: "Error to get likes", error});
        };
        
    };

    static async getLikeById(req:Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const likeService = container.resolve(LikeService);
            const getLike = await likeService.getLikeById(parseInt(id));
            if(!getLike){
                res.status(404).json({message: "Like not found"});
                return;
            };
            res.status(200).json({message: "Like found", like: getLike});
        }catch(error){
            res.status(404).json({message: "Erro to get like", error});
        };
    };

    static async createLike(req:Request, res: Response):Promise<void>{
        try{
            const {quantity, post_id} = req.body;
            const dataVerify = Util.verifyData(quantity, post_id);
            if(!dataVerify){
                res.status(400).json({message: "Is necesary all params quantity, post_id"});
                return;
            };
            const likeService = container.resolve(LikeService);
            const createdLike = await likeService.createLike({quantity,post_id});
            res.status(201).json({message: "Created like correctly", createdLike});
        }catch(error){
            res.status(404).json({message: "Like not found", error});
        };
    };

    static async updateLike(req:Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const {quantity, post_id} = req.body;
            const dataVerify = Util.verifyData(quantity,post_id);
            if(!dataVerify){
                res.status(400).json({message: "Is necesary all params quantity,post_id"});
                return;
            };
            const likeService = container.resolve(LikeService);
            await likeService.updateLike(parseInt(id), {quantity,post_id});
            res.status(200).json({message: "Updated like correctly"});
        }catch(error){
            res.status(404).json({message: "Like not found", error});
        }
    };
    static async deleteLike(req:Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const likeService = container.resolve(LikeService);
            await likeService.deleteLike(parseInt(id));
            res.status(200).json({message: "Deleted like correctly"});
        }catch(error){
            res.status(404).json({message: "Like not found", error});
        };
    };
};