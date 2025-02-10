import _db from "../../persistence/database.js"
import { DataTypes } from "sequelize"
import Employee from "./employee.js"
import Item from "./item.js"

const InventoryRecord = _db.define(
    "inventoryRecord",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        deliveryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    }
)

// Employee.hasOne(InventoryRecord, { foreignKey: { allowNull: false } })
Item.hasOne(InventoryRecord, { foreignKey: { allowNull: false }, onDelete: "RESTRICT" })

InventoryRecord.belongsTo(Employee, {
    foreignKey: "deliveredByEmployeeId",
    sourceKey: "id",
    as: 'deliveredByEmployee',
    onDelete: "RESTRICT"
});

InventoryRecord.belongsTo(Item, {
    foreignKey: "itemId",
    sourceKey: "id",
    onDelete: "RESTRICT"
});


InventoryRecord.belongsTo(Employee, {
    foreignKey: "deliveredToEmployeeId",
    sourceKey: "id",
    as: 'deliveredToEmployee',
    onDelete: "RESTRICT"
});

export default InventoryRecord