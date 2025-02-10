import { DataTypes } from "sequelize"
import _db from "../../persistence/database.js"
import Role from "./role.js"
import Employee from "./employee.js"

const User = _db.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)


Role.hasMany(User, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })
Employee.hasMany(User, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })

User.belongsTo(Role, {
    foreignKey: "roleId",
    sourceKey: "id",
    onDelete: "RESTRICT"
});

User.belongsTo(Employee, {
    foreignKey: "employeeId",
    sourceKey: "id",
    onDelete: "RESTRICT"
});

export default User