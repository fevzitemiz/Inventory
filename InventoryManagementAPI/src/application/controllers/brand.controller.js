import Brand from "../../domain/models/brand.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Brands']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/BrandGetAllResponse' }
    } */
    try {
        const data = await Brand.findAll({
            attributes: ["id", "description"],
            order: [
                ['description', 'ASC'],
            ],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Brands']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/BrandGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Brand.findAll({
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
    // #swagger.tags = ['Brands']
    /*	#swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/BrandCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/BrandCreateResponse' }
    } */
    try {
        const { description } = req.body

        if ((description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Brand.create({
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Brands']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/BrandUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/BrandUpdateResponse' }
    } */
    try {
        const { id, description } = req.body

        if ((id == null) || (id == "") || (description == null) || (description == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Brand.findByPk(id)
        data.description = description
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Brands']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/BrandDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Brand.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, false, error.message))
    }
}