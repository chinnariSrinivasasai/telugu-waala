import express from "express";
import {
  getUsers,
  getWithdraws,
  approveWithdraw,
  rejectWithdraw,
  addCoins
} from "../controllers/admin.controller.js";

import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);
router.get("/withdraws", protect, adminOnly, getWithdraws);
router.post("/withdraw/approve/:id", protect, adminOnly, approveWithdraw);
router.post("/withdraw/reject/:id", protect, adminOnly, rejectWithdraw);
router.post("/add-coins", protect, adminOnly, addCoins);

export default router;
