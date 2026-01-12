import express from "express";
import { spinNow } from "../controllers/spin.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, spinNow);

export default router;
