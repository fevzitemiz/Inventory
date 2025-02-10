import { Router } from "express";
import swaggerFile from '../../../swagger-output.json' with {type: "json"};
const router = Router();

router.get("/swagger", (req, res) => {
    res.send(swaggerFile);
});
export default router;