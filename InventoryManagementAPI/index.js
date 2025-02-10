import app from "./app.js"
import "dotenv/config"
import createDatabaseIfNotExists from "./src/persistence/dbChecker.js"
import fs from "fs"
import https from "https"
import path from 'path';

async function startServer() {
    try {
        await createDatabaseIfNotExists()
        // const __dirname = path.resolve()
        // const opt = {
        //     key: fs.readFileSync(__dirname + '/certs/sage.key', 'utf8'),
        //     cert: fs.readFileSync(__dirname + '/certs/sage.cert', 'utf8')
        // };
        // const server = https.createServer(opt, app)
        // server.listen(process.env.APP_PORT, () => {
        //     console.log("Server Started!")
        // })
         app.listen(process.env.APP_PORT, () => {
             console.log("Server Started!")
         })
    } catch (error) {
        console.log("Server Cannot Start!"+error)
    }
}

startServer()