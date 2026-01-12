import express from "express";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const list = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
});

export default router;
