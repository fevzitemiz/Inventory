import {
    Create,
    Delete,
    GetAll,
    GetById,
    Update
} from "../controllers/software.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/softwares/", GetAll)
router.get("/api/software/:id", GetById)
router.post("/api/software/", Create)
router.put("/api/software/", Update)
router.delete("/api/software/:id", Delete)

export default router