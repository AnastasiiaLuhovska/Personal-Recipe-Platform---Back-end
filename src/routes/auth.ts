import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {registerController} from "../controllers/auth";
import {validationSchemaRegister} from "../validation/register";
import {validateBody} from "../middlewares/validateBody";


const authRouter = Router()
authRouter.post('/auth/register', validateBody(validationSchemaRegister), ctrlWrapper(registerController))

export default authRouter