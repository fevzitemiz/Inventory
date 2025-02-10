import _db from "../../persistence/database.js"
import { DataTypes } from "sequelize"

const Position = _db.define(
    "positions",
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

export default Position