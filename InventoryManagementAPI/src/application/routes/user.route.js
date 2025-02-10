import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update,
    UpdatePassword
} from "../controllers/user.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/users/", GetAll)
router.get("/api/user/:id", GetById)
router.post("/api/user/updatePassword", verifyRole, UpdatePassword)
router.post("/api/user/", verifyRole, Create)
router.put("/api/user/", verifyRole, Update)
router.delete("/api/user/:id", verifyRole, Delete)

export default router