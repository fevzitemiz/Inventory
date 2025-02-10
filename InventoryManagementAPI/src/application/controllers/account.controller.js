import jwt from 'jsonwebtoken';
import User from "../../domain/models/user.js"
import Role from "../../domain/models/role.js"
import { verifyPassword } from "../extensions/password-hasher.js";
import Employee from '../../domain/models/employee.js';

export const login = async (requests, responses) => {
    /* 	#swagger.tags = ['Account'] */
    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Login Payload Bilgileri.',
            required: true,
            schema: { $ref: "#/definitions/LoginModel" }
    } */
    /* #swagger.responses[200] = {
         schema: { $ref: '#/definitions/LoginResponse' }
    } */
    const { userName, password } = requests.body;
    try {
        const user = await User.findOne({
            include: [{
                model: Role,
                attributes: ['description'],
            },
            {
                model: Employee,
                attributes: ['name', 'surName'],
            }],
            where: {
                userName: userName,
                isActive: true
            },
        });

        if (!await verifyPassword(user.password, password)) {
            responses.status(401);
            responses.send("Yetkisiz Giriş!");
            return;
        } else {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                name: user.employee.name,
                surName: user.employee.surName,
                isAdmin: JSON.stringify(user.role).includes("Admin"),
                time: Date(),
                userId: user.id,
            }

            const token = jwt.sign(data, jwtSecretKey);
            const tokenInfo = {
                authToken: token
            };
            responses.send(tokenInfo);
            return;
        }
    } catch (error) {
        console.log("Veri Çekilemedi! Detay: " + error);
        responses.status(401);
        responses.send("Yetkisiz Giriş!");
        return;
    }

    responses.status(401);
    responses.send("Yetkisiz Giriş!");
    return;
};