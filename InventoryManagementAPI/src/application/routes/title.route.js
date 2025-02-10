import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/title.controller.js"
import { Router } from "express"
import verifyRole from "../middlewares/role-protector.js"

const router = Router()

router.get("/api/titles/", GetAll)
router.get("/api/title/:id", GetById)
router.post("/api/title/", verifyRole, Create)
router.put("/api/title/", verifyRole, Update)
router.delete("/api/title/:id", verifyRole, Delete)

export default router