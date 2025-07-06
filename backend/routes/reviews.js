import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createReview);
router.get("/:tourId", verifyUser, getReviews);

export default router;
