import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { editCycle, getAllCycles, registerCycle } from "../controllers/cycle.controller.js";
import { getCycleDetails } from "../controllers/cycle.controller.js";


const router = Router();
router.route('/registerCycle').post(registerCycle);
router.route('/editCycle').post(editCycle);
router.route("/details").get(getCycleDetails);
router.route("/getAllCycles").post(getAllCycles);

export default router;