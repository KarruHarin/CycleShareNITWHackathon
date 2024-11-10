import {Router} from "express";

import { writeAReview,getReviews } from "../controllers/review.controller.js";

const router = Router();
router.route('/write').post(writeAReview);
router.route('/getReviews').post(getReviews);

export default router;