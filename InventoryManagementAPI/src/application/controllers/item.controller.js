import Item from "../../domain/models/item.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"
import Brand from "../../domain/models/brand.js"
import TypeOfItem from "../../domain/models/type-of-item.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Item']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/ItemGetAllResponse' }
    } */
    try {
        const data = await Item.findAll({
            attributes: ["id", "model", "serialNumber", "eRegistryNumber", "description"],
            include: [{
                model: Brand,
                attributes: ['id', 'description'],
            },
            {
                model: TypeOfItem,
                attributes: ['id', 'description'],
            }],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Item']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/ItemGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Item.findAll({
            attributes: ["id", "model", "serialNumber", "eRegistryNumber", "description"],
            include: [{
                model: Brand,
                attributes: ['id', 'description'],
            },
            {
                model: TypeOfItem,
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
    // #swagger.tags = ['Item']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/ItemCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/ItemCreateResponse' }
    } */
    try {
        const { model, serialNumber, eRegistryNumber, description, typeOfItemId, brandId } = req.body

        if (((model == null) || (serialNumber == null) || (eRegistryNumber == null) || (description == null) || (typeOfItemId == null)) || ((model == "") || (serialNumber == "") || (eRegistryNumber == "") || (description == "") || (typeOfItemId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Item.create({
            description,
            model,
            serialNumber,
            eRegistryNumber,
            typeOfItemId,
            brandId
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Item']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/ItemUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/ItemUpdateResponse' }
    } */
    try {
        const { id, model, serialNumber, eRegistryNumber, description, typeOfItemId, brandId } = req.body

        if (((id == null) || (model == null) || (serialNumber == null) || (eRegistryNumber == null) || (description == null) || (typeOfItemId == null)) || ((id == "") || (model == "") || (serialNumber == "") || (eRegistryNumber == "") || (description == "") || (typeOfItemId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Item.findByPk(id)
        data.model = model
        data.serialNumber = serialNumber
        data.eRegistryNumber = eRegistryNumber
        data.description = description
        data.typeOfItemId = typeOfItemId
        data.brandId = brandId
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Item']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/ItemDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Item.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}