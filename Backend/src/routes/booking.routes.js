import { Router } from "express";
import { bookACycle,updateBookingStatus } from "../controllers/booking.controller";
const router = Router();
router.route('/bookACycle').post(bookACycle);
router.route('/statusUpdating').post(updateBookingStatus);
export default router;