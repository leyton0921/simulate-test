import { injectable } from "tsyringe";
import Post from "../models/postModel";

@injectable()
export default class PostRepository{
    async getPosts():Promise<Post[]>{
        return await Post.findAll();
    }

    async getPostById(post_id:number):Promise<Post | null>{
        return await Post.findOne({
            where: {id: post_id}
        })
    }

    async createPost(post: Partial<Post>):Promise<Post>{
        return await Post.create(post);
    }

    async updatePost(postFound:Partial<Post>, post:Partial<Post>): Promise<void>{
        await postFound.update!(post);
    }

    async deletePost(post_id:number):Promise<void>{
        await Post.destroy({
            where: {id: post_id}
        });
    }
}