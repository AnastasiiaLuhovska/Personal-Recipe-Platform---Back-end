import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {loginController, registerController} from "../controllers/auth";
import {validationSchemaLogin, validationSchemaRegister} from "../validation/register";
import {validateBody} from "../middlewares/validateBody";


const authRouter = Router()
authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))
authRouter.post('/auth/login', validateBody(validationSchemaLogin), ctrlWrapper(loginController))

export default authRouter