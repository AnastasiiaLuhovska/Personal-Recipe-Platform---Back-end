import express from 'express'
import cors from 'cors'
import errorHandler from "./middlewares/errorHandler";
import {notFoundHandler} from "./middlewares/notFoundHandler";
import router from "./routes/recipes";
import authRouter from "./routes/auth";
import cookieParser from 'cookie-parser';
import {getEnvVar} from "./utils/getEnvVar";

export const startServer = ()=>{

    const app = express()

    app.use(express.json())

    app.use(cors({
        origin: getEnvVar('FRONTEND_URL') ,
        credentials: true
    }));

    app.use(cookieParser())

    app.use('/auth', authRouter)

    app.use('/recipes', router)

    app.use(notFoundHandler)

    app.use(errorHandler)


    app.listen(3000, ()=> {console.log('server is working')})


}