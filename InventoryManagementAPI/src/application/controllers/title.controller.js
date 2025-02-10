import Title from "../../domain/models/title.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Title']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TitleGetAllResponse' }
    } */
    try {
        const data = await Title.findAll({
            attributes: ["id", "description"],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Title']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TitleGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Title.findAll({
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
    // #swagger.tags = ['Title']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/TitleCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TitleCreateResponse' }
    } */
    try {
        const { description } = req.body

        if ((description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Title.create({
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Title']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/TitleUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TitleUpdateResponse' }
    } */
    try {
        const { id, description } = req.body

        if ((id == null) || (id == "") || (description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Title.findByPk(id)
        data.description = description
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Title']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/TitleDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Title.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}