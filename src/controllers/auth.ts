import {NextFunction, Request, Response} from "express";
import {loginUser, registerUser, setupCookies} from "../services/auth";

export const registerController = async(req:Request, res:Response , next:NextFunction)=>{
    await registerUser(req.body)

    res.status(201).json({
        status:201,
        message: 'User was successfully created',
    })
}

export const loginController = async(req:Request, res:Response , next:NextFunction)=>{
    const {refreshToken, _id, refreshValidUntil, accessToken} = await loginUser(req.body)
    setupCookies(refreshToken, _id, refreshValidUntil, res)
    res.json({
        status:200,
        message: 'User was successfully logged in',
        accessToken
    })
}