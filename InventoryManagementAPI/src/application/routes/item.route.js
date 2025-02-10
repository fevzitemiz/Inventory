import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/item.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/items/", GetAll)
router.get("/api/item/:id", GetById)
router.post("/api/item/", Create)
router.put("/api/item/", Update)
router.delete("/api/item/:id", Delete)

export default router