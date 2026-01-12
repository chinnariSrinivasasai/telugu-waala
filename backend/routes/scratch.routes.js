import express from "express";
import { scratch } from "../controllers/scratch.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, scratch);

export default router;
