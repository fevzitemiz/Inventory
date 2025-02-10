import InventoryRecord from "../../domain/models/inventory-records.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"
import Employee from "../../domain/models/employee.js"
import Item from "../../domain/models/item.js"
import Brand from "../../domain/models/brand.js"
import TypeOfItem from "../../domain/models/type-of-item.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['InventoryRecord']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/InventoryRecordGetAllResponse' }
    } */
    try {
        const data = await InventoryRecord.findAll({
            attributes: ["id", "deliveryDate", "returnDate", "description"],
            include: [{
                model: Employee,
                foreignKey: 'deliveredByEmployeeId',
                as: 'deliveredByEmployee',
                attributes: ['id', 'name', "surName"],
                // where: {
                //     deliveredByEmployeeId
                // }
            },
            {
                model: Employee,
                as: 'deliveredToEmployee',
                foreignKey: 'deliveredToEmployeeId',
                attributes: ['id', 'name', "surName"],
                // where: {
                //     deliveredToEmployeeId
                // }
            },
            {
                model: Item,
                attributes: ['id', 'model', 'eRegistryNumber'],
                include: [{
                    model: Brand,
                    attributes: ['id', 'description']
                },
                {
                    model: TypeOfItem,
                    attributes: ['id', 'description']
                }]
            }
            ],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['InventoryRecord']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/InventoryRecordGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await InventoryRecord.findAll({
            attributes: ["id", "deliveryDate", "returnDate", "description"],
            include: [{
                model: Employee,
                as: 'deliveredByEmployee',
                attributes: ['id', 'name', "surName"],
                where: {
                    deliveredByEmployeeId
                }
            },
            {
                model: Employee,
                as: 'deliveredToEmployee',
                attributes: ['id', 'name', "surName"],
                where: {
                    deliveredToEmployeeId
                }
            },
            {
                model: Item,
                attributes: ['id', 'description'],
            }],
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Create = async (req, res) => {
    // #swagger.tags = ['InventoryRecord']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/InventoryRecordCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/InventoryRecordCreateResponse' }
    } */
    try {
        var { deliveryDate, returnDate, description, itemId, deliveredByEmployeeId, deliveredToEmployeeId } = req.body

        if (((deliveryDate == null) || (description == null) || (itemId == null) || (deliveredByEmployeeId == null) || (deliveredToEmployeeId == null)) || ((deliveryDate == "") || (description == "") || (itemId == "") || (deliveredByEmployeeId == "") || (deliveredToEmployeeId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        if (returnDate == null || returnDate == "")
            returnDate = null
        const data = await InventoryRecord.create({
            deliveryDate: deliveryDate,
            returnDate: returnDate,
            description: description,
            itemId: itemId,
            deliveredByEmployeeId: deliveredByEmployeeId,
            deliveredToEmployeeId: deliveredToEmployeeId
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['InventoryRecord']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/InventoryRecordUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/InventoryRecordUpdateResponse' }
    } */
    try {
        var { id, deliveryDate, returnDate, description, itemId, deliveredByEmployeeId, deliveredToEmployeeId } = req.body

        if (((id == null) || (deliveryDate == null) || (description == null) || (itemId == null) || (deliveredByEmployeeId == null) || (deliveredToEmployeeId == null)) || ((id == "") || (deliveryDate == "") || (description == "") || (itemId == "") || (deliveredByEmployeeId == "") || (deliveredToEmployeeId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await InventoryRecord.findByPk(id)
        data.deliveryDate = deliveryDate
        data.returnDate = (returnDate == null || returnDate == "" ? null : returnDate)
        data.description = description
        data.itemId = itemId
        data.deliveredByEmployeeId = deliveredByEmployeeId
        data.deliveredToEmployeeId = deliveredToEmployeeId
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['InventoryRecord']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/InventoryRecordDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await InventoryRecord.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}