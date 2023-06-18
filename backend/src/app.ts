
import cors from "cors"
import express from "express"
import appConfig from "./2-utils/app-config"
import catchAll from "./3-middleware/catch-all"
import routeNotFound from "./3-middleware/route-not-found"
import expressFileUpload from "express-fileupload"
import vacationsController from "./6-controllers/vacations-controller"
import followersController from "./6-controllers/followers-controller"
import authController from "./6-controllers/auth-controller"


// Create the server
const server = express()

// Define CORS Policy:
server.use(cors()) // Allow to everyone send me request.

server.use(expressFileUpload())
// Define json reading on project
server.use(express.json()) // creates request.body object if exists

server.use("/api",vacationsController)
server.use("/api",followersController)
server.use("/api",authController)



server.use("*",routeNotFound)
server.use(catchAll)

// Listen on port
server.listen(appConfig.port, ()=> console.log(`Listening on http://localhost:${appConfig.port}`))