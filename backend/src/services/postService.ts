import { inject, injectable } from "tsyringe";
import Post from "../models/postModel";
import PostRepository from "../repositories/postRepository";

@injectable()
export default class PostService{
    constructor(@inject(PostRepository) private postRepository: PostRepository){}
    async getPost():Promise<Post[]>{
        return await this.postRepository.getPosts();
    };

    async getPostById(post_id:number):Promise<Post | null> {
        return await this.postRepository.getPostById(post_id);
    };
    async createPost(post:Partial<Post>):Promise<Post>{
        return await this.postRepository.createPost(post);
    };
    async updatePost(post_id:number, post:Partial<Post>): Promise<void>{
        const postFound = await this.getPostById(post_id);
        if(postFound){
            await this.postRepository.updatePost(postFound,post);
            return;
        }
    };
    async deletePost(post_id:number):Promise<void | undefined>{
        const postFound = await this.getPostById(post_id);
        if(postFound){
            await this.postRepository.deletePost(post_id);
            return;
        }
    };
}
