import _db from "../../persistence/database.js"
import { DataTypes } from "sequelize"

const Role = _db.define(
    "roles",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
)

export default Role