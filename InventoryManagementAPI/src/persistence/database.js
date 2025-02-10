import { Sequelize } from "sequelize";
import "dotenv/config"

const _db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
)

export default _db