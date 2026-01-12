import express from "express";
import { requestWithdraw } from "../controllers/withdraw.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, requestWithdraw);

export default router;
