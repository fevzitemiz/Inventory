import { DataTypes } from "sequelize"
import _db from "../../persistence/database.js"
import Position from "./position.js"
import Title from "./title.js"

const Employee = _db.define(
    "employees",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gsm: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

Position.hasMany(Employee, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })
Title.hasMany(Employee, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })

Employee.belongsTo(Position, {
    foreignKey: "positionId",
    sourceKey: "id",
    onDelete: 'RESTRICT'
});

Employee.belongsTo(Title, {
    foreignKey: "titleId",
    sourceKey: "id",
    onDelete: 'RESTRICT'
});

export default Employee