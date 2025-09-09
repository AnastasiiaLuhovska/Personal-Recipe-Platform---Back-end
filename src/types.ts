import {Document, Types} from "mongoose";

export interface CustomError extends Error {
    status?: number;
}

export interface SessionData extends Document{
    _id: Types.ObjectId,
    userId: Types.ObjectId
    accessToken: string,
    refreshToken: string,
    accessValidUntil: Date,
    refreshValidUntil: Date
}