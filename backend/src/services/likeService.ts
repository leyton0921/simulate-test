import { inject, injectable } from "tsyringe";
import LikeRepository from "../repositories/likeRepository";
import Like from "../models/likeModel";

@injectable()
export default class LikeService{
    constructor(@inject(LikeRepository) private likeRepository: LikeRepository){}

    async getLikes():Promise<Like[] | undefined>{
        return await this.likeRepository.getLikes();
    };
    async getLikeById(like_id:number):Promise<Like | null>{
        return await this.likeRepository.getLikeById(like_id);
    };
    async createLike(like:Partial<Like>):Promise<Like>{
        return await this.likeRepository.createLike(like);
    };
    async updateLike(like_id:number, like:Partial<Like>):Promise<void>{
        const likeFound = await this.getLikeById(like_id)
        if(likeFound){
            await this.likeRepository.updateLike(likeFound, like)
            return;
        };  
    };
    async deleteLike(like_id:number):Promise<void>{
        const likeFound = await this.getLikeById(like_id);
        if(likeFound){
            await this.likeRepository.deleteLike(like_id);
            return;
        };
    };
};