import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/role.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/roles/", GetAll)
router.get("/api/role/:id", GetById)
router.post("/api/role/", verifyRole, Create)
router.put("/api/role/", verifyRole, Update)
router.delete("/api/role/:id", verifyRole, Delete)

export default router