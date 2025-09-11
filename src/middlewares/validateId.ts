import mongoose from "mongoose";
import createHttpError from "http-errors";

export const validateId = (req, res, next)=>{
    const {recipeId} = req.params
    const isValid = mongoose.isValidObjectId(recipeId)
    if(!isValid) {
        next(createHttpError(400, 'Invalid ID format'))
        return
    }
    next()
}