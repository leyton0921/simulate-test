import { container } from "tsyringe";
import UserService from "../services/userService";
import { Request, Response } from "express";
import Util from "../utils/util";

export default class UserController{

    static async getUsers(_: Request, res: Response):Promise<void>{
        try{
            const userService = container.resolve(UserService);
            const getUsers = await userService.getUsers();
            res.status(200).json({message: "users found", users: getUsers});
        }catch(error){
            res.status(404).json({message: "Error to get users", error});
        }
    }

    static async getUserById(req:Request, res:Response):Promise<void>{
        try{
            const userService = container.resolve(UserService);
            const getUser = await userService.getUserById(parseInt(req.params.id));
            res.status(200).json({messae: "User found", user: getUser})
        }catch(error){
            res.status(404).json({message: "Error to get user", error})
        }
    }

    static async createUser(req:Request, res:Response):Promise<void>{
        try{
            const {name,email,password} = req.body;
            const dataVerify = Util.verifyData(name,email,password);
            if(!dataVerify){
                res.status(400).json({message: "Is necesary all params name,email,password"});
                return;
            }
            const userService = container.resolve(UserService);
            const createdUser = await userService.postUser({name,email,password});
            if(!createdUser){
                res.status(400).json({message: "User exists. Try again!"});
                return;
            }
            res.status(201).json({message: "Created user correctly", user:createdUser});
        }catch(error){
            res.status(400).json({message: "Error to create user", error})
        }
    }

    static async updateUser(req:Request, res:Response):Promise<void>{
        try{
            const {name,email,password} = req.body;
            const dataVerify = Util.verifyData(name,email,password);
            if(!dataVerify){
                res.status(400).json({message: "Is necesary all params name,email,password"});
                return;
            }
            const userService = container.resolve(UserService);
            const updatedUser = await userService.updateUser(parseInt(req.params.id), {name,email,password})
            res.status(200).json({message: "Updated user correctly", user: updatedUser})
        }catch(error){
            res.status(500).json({message: "Error to update user", error})
        }
    }

    static async deleteUser(req:Request, res:Response):Promise<void>{
        try{
            const userService = container.resolve(UserService);
            await userService.deleteUser(parseInt(req.params.id));
            res.status(200).json({message: "Deleted user correctly"});
        }catch(error){
            res.status(500).json({message: "Error to delete user", error})
        }
    }
}