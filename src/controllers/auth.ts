import {NextFunction, Request, Response} from "express";
import {registerUser} from "../services/auth";

export const registerController = async(req:Request, res:Response , next:NextFunction)=>{
await registerUser(req.body)

    res.status(201).json({
        status:201,
        message: 'User was successfully created',
    })
}