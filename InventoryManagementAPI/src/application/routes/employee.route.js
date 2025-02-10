import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/employee.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/employees/", GetAll)
router.get("/api/employee/:id", GetById)
router.post("/api/employee/", verifyRole, Create)
router.put("/api/employee/", verifyRole, Update)
router.delete("/api/employee/:id", verifyRole, Delete)

export default router