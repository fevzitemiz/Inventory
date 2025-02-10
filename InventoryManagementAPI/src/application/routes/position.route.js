import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/position.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/positions/", GetAll)
router.get("/api/position/:id", GetById)
router.post("/api/position/", verifyRole, Create)
router.put("/api/position/", verifyRole, Update)
router.delete("/api/position/:id", verifyRole, Delete)

export default router