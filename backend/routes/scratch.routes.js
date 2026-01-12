import express from "express";
import { scratchNow } from "../controllers/scratch.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, scratchNow);

export default router;
