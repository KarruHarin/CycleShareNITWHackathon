import {Router} from "express";
import { registerUser,getUser,loginUser,logoutUser,generateAccessAndRefreshToken,refreshAccessToken, verifyUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify").post(verifyUser)
router.route("/getUser").post(getUser)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh").post(refreshAccessToken)

export default router;
