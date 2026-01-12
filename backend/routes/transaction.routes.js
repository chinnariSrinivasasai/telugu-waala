import express from "express";
import { getMyTransactions } from "../controllers/transaction.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getMyTransactions);

export default router;
