import {UserCollection} from "../db/models/userSchema";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {SessionCollection} from "../db/models/sessionSchema";
import {randomBytes} from "crypto";
import {FIFTEEN_MIN, ONE_DAY} from "../constants";
import {Types} from "mongoose";

export const registerUser = async({name, email, password})=>{
    const user = await UserCollection.findOne({email})
    if(user) throw createHttpError(409, `User with email ${email} already exists`)

    const hashedPass = await bcrypt.hash(password, 10)

   await UserCollection.create({name, email, password: hashedPass})
}

const createSession = async(userId:Types.ObjectId)=>{
    await SessionCollection.findOneAndDelete({userId})

    const accessToken = randomBytes(30).toString('base64')
    const refreshToken = randomBytes(30).toString('base64')
    const accessValidUntil = new Date(Date.now() + FIFTEEN_MIN)
    const refreshValidUntil = new Date(Date.now() + ONE_DAY)

   return await SessionCollection.create({
        userId,
        accessToken,
        refreshToken,
        accessValidUntil,
        refreshValidUntil
    })
}

export const loginUser = async({email, password})=>{
    const user = await UserCollection.findOne({email})
    if(!user) throw createHttpError(404, 'User was not found')

    const isEqual = await bcrypt.compare(password, user.password)
    if(!isEqual) throw createHttpError(401, 'Email or password is invalid')

   return await createSession(user._id)
}

export const setupCookies = (refreshToken, sid, refreshValidUntil, res)=>{
    res.cookie('refreshToken', refreshToken,{
        httpOnly:true,
        expires: refreshValidUntil
})
    res.cookie('sid', sid, {
        httpOnly:true,
        expires: refreshValidUntil
    })
}

export const refreshSession = async(refreshToken, _id) =>{
    const session = await SessionCollection.findOne({ refreshToken, _id})

    if(!session) throw createHttpError(401, 'Session was not found')

    if(session.refreshValidUntil < new Date()) throw createHttpError(401, 'Refresh token has expired')

    return await createSession(session.userId)

}

export const logOutUser = async(sessionId)=>{
    await SessionCollection.deleteOne({_id: sessionId})
}