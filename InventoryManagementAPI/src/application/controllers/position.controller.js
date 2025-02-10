import Position from "../../domain/models/position.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Position']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PositionGetAllResponse' }
    } */
    try {
        const data = await Position.findAll({
            attributes: ["id", "description"],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Position']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PositionGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if (id == null || id == "")
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Position.findAll({
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
    // #swagger.tags = ['Position']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/PositionCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PositionCreateResponse' }
    } */
    try {
        const { description } = req.body

        if (description == null || description == "")
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Position.create({
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Position']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/PositionUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PositionUpdateResponse' }
    } */
    try {
        const { id, description } = req.body

        if ((id == null || id == "") || (description == null || description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Position.findByPk(id)
        data.description = description
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Position']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PositionDeleteResponse' }
    } */
    try {
        const { id } = req.params
        const data = await Position.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}