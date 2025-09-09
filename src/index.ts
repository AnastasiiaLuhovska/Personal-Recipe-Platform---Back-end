import {initMongoDBConnection} from "./db/initMongoDBConnection";
import {startServer} from "./server";
import 'dotenv/config'

const bootstrap = async()=>{
    await initMongoDBConnection()
    startServer()
}

bootstrap()