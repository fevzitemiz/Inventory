import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/inventory-record.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/inventory-records/", GetAll)
router.get("/api/inventory-record/:id", GetById)
router.post("/api/inventory-record/", Create)
router.put("/api/inventory-record/", Update)
router.delete("/api/inventory-record/:id", Delete)

export default router