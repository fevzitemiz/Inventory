import express from "express"
import cors from "cors"
import morgan from "morgan"
import verifyToken from "./src/application/middlewares/jwt-protector.js"
import userRoutes from "./src/application/routes/user.route.js"
import brandRoutes from "./src/application/routes/brand.route.js"
import employeeRoutes from "./src/application/routes/employee.route.js"
import inventoryRecordRoutes from "./src/application/routes/inventory-record.route.js"
import itemRoutes from "./src/application/routes/item.route.js"
import positionRoutes from "./src/application/routes/position.route.js"
import roleRoutes from "./src/application/routes/role.route.js"
import softwareRoutes from "./src/application/routes/software.route.js"
import titleRoutes from "./src/application/routes/title.route.js"
import typeOfItemRoutes from "./src/application/routes/type-of-item.route.js"
import loginRoutes from "./src/application/routes/account.routes.js"
import swaggerRoutes from "./src/application/routes/swagger.routes.js"

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with {type: "json"}


const app = express()

//Middleware
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.use(morgan("dev"))
app.use(express.json())

//Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Endpoints
app.use("/", loginRoutes)
app.use("/", swaggerRoutes);

app.use("/", [verifyToken], inventoryRecordRoutes)
app.use("/", [verifyToken], itemRoutes)
app.use("/", [verifyToken], softwareRoutes)

app.use("/", [verifyToken], userRoutes)
app.use("/", [verifyToken], brandRoutes)
app.use("/", [verifyToken], employeeRoutes)
app.use("/", [verifyToken], positionRoutes)
app.use("/", [verifyToken], roleRoutes)
app.use("/", [verifyToken], titleRoutes)
app.use("/", [verifyToken], typeOfItemRoutes)

export default app