import express from "express";
import { spin } from "../controllers/spin.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, spin);

export default router;
