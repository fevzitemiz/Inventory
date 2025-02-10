import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/type-of-item.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/type-of-items/", GetAll)
router.get("/api/type-of-item/:id", GetById)
router.post("/api/type-of-item/", verifyRole, Create)
router.put("/api/type-of-item/", verifyRole, Update)
router.delete("/api/type-of-item/:id", verifyRole, Delete)

export default router