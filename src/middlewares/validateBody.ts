import createHttpError from "http-errors";

export const validateBody = (validationSchema) => async(req, res, next)=>{
    try {
        await validationSchema.validateAsync(req.body, {abortEarly: false, allowUnknown: false,})
        next()
    } catch (e) {
        next(createHttpError(400, 'Bad Request', {errors: e.details}))
    }
}