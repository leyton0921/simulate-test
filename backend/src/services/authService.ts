import { inject, injectable } from "tsyringe";
import User from "../models/userModel";
import UserRepository from "../repositories/userRepository";
import Util from "../utils/util";


@injectable()
export default class AuthService{
    constructor(@inject(UserRepository) private userRepository: UserRepository){}
    async registerUser(user:Partial<User>):Promise<User |{message: string, error: unknown} | boolean>{
        const {name,email} = user;
        const userFound = await this.userRepository.getUserByEmail(email!);
        if(!userFound){
            user.password! = await Util.encryptPassword(user.password!);
            const {password} = user;
            return await this.userRepository.postUsers({name,email,password})
        }
        return false;
    }
    async loginUser(user:Partial<User>):Promise<User |{message: string, error: unknown} | boolean>{
        const {email} = user;
        const userFound = await this.userRepository.getUserByEmail(email!);
        if(!userFound){
            return false;
        }
        return userFound;
    }
}