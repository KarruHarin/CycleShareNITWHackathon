import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { editCycle, registerCycle } from "../controllers/cycle.controller";


const router = Router();
router.route('registerCycle').post(registerCycle);
router.route('editCycle').post(editCycle);

export default router;