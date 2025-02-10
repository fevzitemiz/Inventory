import _db from "../../persistence/database.js"
import { DataTypes } from "sequelize"
import Employee from "./employee.js"

const Software = _db.define(
    "softwares",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        companyEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        companyPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        lastAgreementDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: false
        },
        nextAgreementDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: false
        },
    }
)

Employee.hasMany(Software, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })


Software.belongsTo(Employee, {
    foreignKey: "employeeId",
    sourceKey: "id",
    onDelete: "RESTRICT"
});


export default Software