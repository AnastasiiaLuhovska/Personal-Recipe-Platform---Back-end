import {UserCollection} from "../db/models/userSchema";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const registerUser = async({name, email, password})=>{
    const user = await UserCollection.findOne({email})
    if(user) throw createHttpError(409, `User with email ${email} already exists`)

    const hashedPass = await bcrypt.hash(password, 10)

   await UserCollection.create({name, email, password: hashedPass})
}