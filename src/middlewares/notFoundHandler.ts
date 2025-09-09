import {Request, Response} from "express";


export const notFoundHandler = (req:Request, res:Response)=>{
    res.status(404).json({
        status: 404,
        message:  `${req.url} is not found`
    })
}