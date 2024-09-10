import { inject, injectable } from "tsyringe";
import User from "../models/userModel";
import UserRepository from "../repositories/userRepository";
import { IError } from "../interfaces/errorInterface";

@injectable()
export default class UserService{
    constructor(@inject(UserRepository) private userRepository:UserRepository){}
    async getUsers():Promise<User[]>{
        return await this.userRepository.getUsers();
    }

    async getUserById(user_id:number):Promise<User | null>{
        return await this.userRepository.getUserById(user_id)
    }

    async postUser(user: Partial<User>):Promise<User | undefined>{
        const {email} = user;
        const userFound = await this.userRepository.getUserByEmail(email!);
        if(!userFound){
            return await this.userRepository.postUsers(user);
        }
        return;
    }

    async updateUser(user_id:number, user:Partial<User>):Promise<User | undefined>{
        const userFound = await this.getUserById(user_id);
        if(!userFound)return;
        return await this.userRepository.updateUser(userFound!, user);
    }

    async deleteUser(user_id:number):Promise<void>{
        await this.userRepository.deleteUser(user_id);
    }
}