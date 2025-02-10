import { Router } from "express";

import {
    login
} from "../controllers/account.controller.js"

const router = Router();

router.post("/api/login", login);

export default router;