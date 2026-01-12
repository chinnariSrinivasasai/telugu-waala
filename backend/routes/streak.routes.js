import express from "express";
import { claimStreak } from "../controllers/streak.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/claim", protect, claimStreak);

export default router;
