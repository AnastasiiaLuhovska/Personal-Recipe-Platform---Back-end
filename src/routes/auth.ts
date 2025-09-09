import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {loginController, logoutController, refreshController, registerController} from "../controllers/auth";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/register";
import {validateBody} from "../middlewares/validateBody";


const authRouter = Router()
authRouter.post('/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))
authRouter.post('/refresh', ctrlWrapper(refreshController))
authRouter.post('/logout', ctrlWrapper(logoutController))


export default authRouter