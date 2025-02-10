import Role from "../../domain/models/role.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Role']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/RoleGetAllResponse' }
    } */
    try {
        const data = await Role.findAll({
            attributes: ["id", "description"],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Role']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/RoleGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Role.findAll({
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
    // #swagger.tags = ['Role']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/RoleCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/RoleCreateResponse' }
    } */
    try {
        const { description } = req.body

        if ((description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Role.create({
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Role']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/RoleUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/RoleUpdateResponse' }
    } */
    try {
        const { id, description } = req.body

        if ((id == null) || (id == "") || (description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Role.findByPk(id)
        data.description = description
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Role']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/RoleDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Role.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}