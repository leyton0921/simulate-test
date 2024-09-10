import { injectable } from "tsyringe";
import Like from "../models/likeModel";

@injectable()
export default class LikeRepository{
    async getLikes():Promise<Like[] | undefined>{
        return await Like.findAll();
    };

    async getLikeById(like_id:number):Promise<Like | null>{
        return await Like.findOne({
            where: {id: like_id}
        });
    };

    async createLike(like:Partial<Like>):Promise<Like>{
        return await Like.create(like);
    };

    async updateLike(likeFound:Like, like: Partial<Like>):Promise<void>{
        await likeFound.update(like);
    };

    async deleteLike(like_id:number):Promise<void>{
        await Like.destroy({
            where: {id: like_id}
        });
    };
}