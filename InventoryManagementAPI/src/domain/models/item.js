import _db from "../../persistence/database.js"
import { DataTypes } from "sequelize"
import Brand from "./brand.js"
import TypeOfItem from "./type-of-item.js"

const Item = _db.define(
    "items",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        eRegistryNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    }
)

Brand.hasMany(Item, { foreignKey: { allowNull: false },onDelete: "RESTRICT" })
TypeOfItem.hasMany(Item, { foreignKey: { allowNull: false } ,onDelete: "RESTRICT"})

Item.belongsTo(Brand, {
    foreignKey: "brandId",
    sourceKey: "id",
    onDelete: "RESTRICT"

});

Item.belongsTo(TypeOfItem, {
    foreignKey: "typeOfItemId",
    sourceKey: "id",
    onDelete: "RESTRICT"
});

export default Item