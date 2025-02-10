import TypeOfItem from "../../domain/models/type-of-item.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['TypeOfItem']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TypeOfItemGetAllResponse' }
    } */
    try {
        const data = await TypeOfItem.findAll({
            attributes: ["id", "description"],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['TypeOfItem']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TypeOfItemGetByIdResponse' }
    } */
    try {
        const { id } = req.params
        if (id == null || id == 0)
            return res.status(500).json(ResultWrapper(false, null, "No Data Found!"))

        const data = await TypeOfItem.findAll({
            attributes: ["id", "description"],
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
    // #swagger.tags = ['TypeOfItem']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/TypeOfItemCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TypeOfItemCreateResponse' }
    } */
    try {
        const { description } = req.body
        if (description == null || description == "")
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))
        const data = await TypeOfItem.create({
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['TypeOfItem']
    /*	#swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/TypeOfItemUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TypeOfItemUpdateResponse' }
    } */
    try {
        const { id, description } = req.body
        if ((id == null) || (description == null || description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await TypeOfItem.findByPk(id)
        data.description = description
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))

    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['TypeOfItem']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TypeOfItemDeleteResponse' }
    } */
    try {
        const { id } = req.params
        if (id == null)
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))
        const data = await TypeOfItem.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}