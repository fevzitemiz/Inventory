import Employee from "../../domain/models/employee.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"
import Title from "../../domain/models/title.js"
import Position from "../../domain/models/position.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Employee']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/EmployeeGetAllResponse' }
    } */
    try {
        const data = await Employee.findAll({
            attributes: ["id", "name", "surName", "email", "gsm"],
            include: [{
                model: Position,
                attributes: ['id', 'description'],
            },
            {
                model: Title,
                attributes: ['id', 'description'],
            }],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Employee']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/EmployeeGetByIdResponse' }
    } */

    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Employee.findAll({
            attributes: ["id", "name", "surName", "email", "gsm"],
            include: [{
                model: Position,
                attributes: ['id', 'description'],
            },
            {
                model: Title,
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
    // #swagger.tags = ['Employee']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/EmployeeCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/EmployeeCreateResponse' }
    } */
    try {
        const { name, surName, email, gsm, titleId, positionId } = req.body

        if ((name == null || surName == null || email == null || titleId == null || positionId == null) || (name == "" || surName == "" || email == "" || titleId == "" || positionId == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Employee.create({
            name,
            surName,
            email,
            gsm,
            titleId,
            positionId
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Employee']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/EmployeeUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/EmployeeUpdateResponse' }
    } */
    try {
        const { id, name, surName, email, titleId, positionId } = req.body

        if ((id == null || name == null || surName == null || email == null || titleId == null || positionId == null) || (id == "" || name == "" || surName == "" || email == "" || titleId == "" || positionId == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Employee.findByPk(id)
        data.name = name
        data.surName = surName
        data.email = email
        data.gsm = gsm
        data.titleId = titleId
        data.positionId = positionId
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Employee']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/EmployeeDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Employee.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}