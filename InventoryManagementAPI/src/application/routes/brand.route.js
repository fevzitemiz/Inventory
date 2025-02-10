import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/brand.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/brands/", GetAll)
router.get("/api/brand/:id", GetById)
router.post("/api/brand/",verifyRole, Create)
router.put("/api/brand/",verifyRole, Update)
router.delete("/api/brand/:id",verifyRole, Delete)

export default router