import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { editCycle, registerCycle } from "../controllers/cycle.controller.js";


const router = Router();
router.route('registerCycle').post(registerCycle);
router.route('editCycle').post(editCycle);

export default router;