import {NextFunction, Request, Response} from "express";
import {loginUser, logOutUser, refreshSession, registerUser, setupCookies} from "../services/auth";

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

export const refreshController = async(req, res, next)=>{
    if (!req.cookies.refreshToken) {
        return res.status(401).json({ status: 401, message: 'No refresh token provided' })
    }
    
    const {refreshToken, _id, accessToken, refreshValidUntil} = await refreshSession(req.cookies.refreshToken, req.cookies.sid)
    setupCookies(refreshToken, _id, refreshValidUntil, res)
    res.json({
        status:200,
        message: 'Token was refreshed',
        accessToken
    })
}

export const logoutController = async(req, res, next)=>{
    const sessionId= req.cookies.sid
    if(sessionId) {
        await logOutUser(sessionId)
    }

    res.clearCookie('sid');
    res.clearCookie('refreshToken');

    res.status(204).send()
}