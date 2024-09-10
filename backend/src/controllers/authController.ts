import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Util from "../utils/util";
import { container } from "tsyringe";
import AuthService from "../services/authService";

export default class AuthController{
    static async registerUser(req: Request, res: Response):Promise<void>{
        const {name, email,password} = req.body;
        const dataVerify = Util.verifyData(name,email,password);
        if(!dataVerify){
            res.status(400).json({message: "Error to create user. Is necesary all params"});
            return;
        }
        const authService = container.resolve(AuthService);
        const createdUser = await authService.registerUser({name,email,password});
        if(createdUser){
            const tokenGenerate = AuthController.generateToken({name,email,password});
            res.status(201).json({message: "Created user correctly", user: createdUser, token:tokenGenerate});
            return;    
        }
        res.status(400).json({message: "User exists. Try again..."});
    }

    static async loginUser(req:Request, res: Response):Promise<void>{
        const {email,password} = req.body;
        const dataVerify = Util.verifyData(email, password);
        if(!dataVerify){
            res.status(400).json({message: "Error to login user. Is necesary all params"});
            return;
        }
        const authService = container.resolve(AuthService);
        const getUser = await authService.loginUser({email})
        if(!getUser){
            res.status(400).json({message: "User not found"});
            return;
        }
        const tokenGenerate = AuthController.generateToken({email,password});
        res.status(200).json({message: "User found", user: getUser, token:tokenGenerate});
    }

    static generateToken = (user:Partial<User>):string =>{
        return jwt.sign(user, "SECRET", {expiresIn: "1h"});
    }
}