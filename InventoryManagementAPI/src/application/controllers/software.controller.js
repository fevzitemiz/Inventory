import Software from "../../domain/models/software.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"
import Employee from "../../domain/models/employee.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['Software']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/SoftwareGetAllResponse' }
    } */
    try {
        const data = await Software.findAll({
            attributes: ["id", "name", "companyEmail", "companyPhone", "description", "lastAgreementDate", "nextAgreementDate"],
            include: [{
                model: Employee,
                attributes: ['id', 'name', "surName"],
            }],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['Software']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/SoftwareGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Software.findAll({
            attributes: ["id", "name", "companyEmail", "companyPhone", "description", "lastAgreementDate", "nextAgreementDate"],
            include: [{
                model: Employee,
                attributes: ['id', 'name', "surName"],
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
    // #swagger.tags = ['Software']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/SoftwareCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/SoftwareCreateResponse' }
    } */
    try {
        const { name, companyEmail, companyPhone, description, lastAgreementDate, nextAgreementDate, employeeId } = req.body

        if (((name == null) || (companyEmail == null) || (companyPhone == null) || (description == null) || (lastAgreementDate == null) || (employeeId == null)) || ((name == "") || (companyEmail == "") || (companyPhone == "") || (description == "") || (lastAgreementDate == "") || (employeeId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await Software.create({
            name,
            companyEmail,
            companyPhone,
            lastAgreementDate,
            nextAgreementDate,
            employeeId,
            description
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['Software']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/SoftwareUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/SoftwareUpdateResponse' }
    } */
    try {
        const { id, name, companyEmail, companyPhone, description, lastAgreementDate, nextAgreementDate, employeeId } = req.body

        if (((id == null) || (name == null) || (companyEmail == null) || (companyPhone == null) || (description == null) || (lastAgreementDate == null) || (employeeId == null)) || ((id == "") || (name == "") || (companyEmail == "") || (companyPhone == "") || (description == "") || (lastAgreementDate == "") || (employeeId == "")))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))


        const data = await Software.findByPk(id)
        data.name = name
        data.companyEmail = companyEmail
        data.companyPhone = companyPhone
        data.description = description
        data.lastAgreementDate = lastAgreementDate
        data.nextAgreementDate = nextAgreementDate
        data.employeeId = employeeId
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['Software']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/SoftwareDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))


        const data = await Software.destroy({
            where: {
                id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}