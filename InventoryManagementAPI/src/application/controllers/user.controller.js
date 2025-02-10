import User from "../../domain/models/user.js"
import ResultWrapper from "../../domain/extensions/result-wrapper.js"
import Role from "../../domain/models/role.js"
import Employee from "../../domain/models/employee.js"
import { hasher, verifyPassword } from "../extensions/password-hasher.js";
import { Op } from "sequelize";
import { verify } from "argon2";
import JwtDecoder from "../extensions/jwt-decoder.js"

export const GetAll = async (req, res) => {
    // #swagger.tags = ['User']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/UserGetAllResponse' }
    } */
    try {
        const data = await User.findAll({
            attributes: ["id", "userName", "isActive"],
            include: [{
                model: Role,
                attributes: ['id', 'description'],
            },
            {
                model: Employee,
                attributes: ['id', 'name', 'surName'],
            }],
        })
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const GetById = async (req, res) => {
    // #swagger.tags = ['User']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/UserGetByIdResponse' }
    } */
    try {
        const { id } = req.params

        if (id == null || id == "")
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await User.findAll({
            attributes: ["id", "userName", "isActive"],
            include: [{
                model: Role,
                attributes: ['id', 'description'],
            },
            {
                model: Employee,
                attributes: ['id', 'name', 'surName'],
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
    // #swagger.tags = ['User']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/UserCreateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/UserCreateResponse' }
    } */
    try {
        const { userName, isActive, roleId, employeeId, password } = req.body

        if ((userName == null || isActive == null || roleId == null || employeeId == null || password == null) || (userName == "" || isActive == "" || roleId == "" || employeeId == "" || password == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const hashedPassword = await hasher(password);
        const data = await User.create({
            userName: userName,
            isActive: isActive,
            roleId: roleId,
            employeeId: employeeId,
            password: hashedPassword
        })
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Update = async (req, res) => {
    // #swagger.tags = ['User']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/UserUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/UserUpdateResponse' }
    } */
    try {
        const { id, userName, isActive, roleId } = req.body

        if ((id == null || userName == null || roleId == null) || (id == "" || userName == "" || roleId == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const data = await User.findByPk(id)
        data.userName = userName
        data.isActive = isActive
        data.roleId = roleId
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const UpdatePassword = async (req, res) => {
    // #swagger.tags = ['User']
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    required: true,
    schema: { $ref: "#/definitions/PasswordUpdateModel" }} */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/PasswordUpdateResponse' }
    } */
    try {
        const { userId, passwordOld, passwordNew } = req.body

        if ((passwordOld == null || passwordOld == null || passwordNew == null) || (passwordOld == "" || passwordNew == "" || userId == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))

        const token = req.header('Authorization');
        const userIdFromToken = JwtDecoder(token).userId;
        const hashedPassword = await hasher(passwordNew);

        if (userIdFromToken != userId)
            return res.status(500).json(ResultWrapper(false, null, "Oturum Bilgileri Yanlış!"))

        const data = await User.findByPk(userId)

        if (!await verify(data.password, passwordOld))
            return res.status(500).json(ResultWrapper(false, null, "Güncel parolanız yanlış!"))

        data.password = hashedPassword
        await data.save()
        return res.status(200).json(ResultWrapper(true, data))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}

export const Delete = async (req, res) => {
    // #swagger.tags = ['User']
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/UserDeleteResponse' }
    } */
    try {
        const { id } = req.params

        if ((id == null) || (id == ""))
            return res.status(500).json(ResultWrapper(false, null, "Girilen veriler eksik! Lütfen kontrol ediniz!"))


        const adminUserCheck = await User.count({
            include: [{
                model: Role,
                attributes: ['id', 'description'],
                where: {
                    id: 1
                }
            }],
            where: {
                id: { [Op.ne]: id }
            }
        })

        if (id == 1)
            return res.status(500).json(ResultWrapper(false, null, " (̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄   Sistem Admini Silinemez !!! "))

        if (adminUserCheck == 0)
            return res.status(500).json(ResultWrapper(false, null, "Sistemde en az 1 aktif admin bulunması gerekmektedir!!"))

        const data = await User.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json(ResultWrapper(true, (data == 1 ? true : false)))
    } catch (error) {
        return res.status(500).json(ResultWrapper(false, null, error.message))
    }
}
