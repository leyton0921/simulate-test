import { injectable } from "tsyringe";
import User from "../models/userModel";
import { where } from "sequelize";
import { IError } from "../interfaces/errorInterface";

@injectable()
export default class UserRepository{
    async getUsers():Promise<User[]>{
        return await User.findAll();
    };

    async getUserById(user_id:number):Promise<User | null>{
        return await User.findOne({
            where: {id: user_id}
        })
    }

    async getUserByEmail(email:string):Promise<User | null>{
        return await User.findOne({
            where: {email}
        })       
    }

    async postUsers(user:Partial<User>):Promise<User>{
        return await User.create(user);
    }

    async updateUser(userFound:Partial<User>, user:Partial<User>):Promise<User | undefined>{
        return await userFound.update!(user);
    }

    async deleteUser(user_id:number):Promise<void>{
        await User.destroy({
            where: {id:user_id}
        })
    }

    
}