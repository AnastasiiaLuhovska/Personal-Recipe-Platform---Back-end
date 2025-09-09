import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {loginController, logoutController, refreshController, registerController} from "../controllers/auth";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/register";
import {validateBody} from "../middlewares/validateBody";


const authRouter = Router()
authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
authRouter.post('/auth/refresh', ctrlWrapper(refreshController))
authRouter.post('/auth/logout', ctrlWrapper(logoutController))


export default authRouter