import User from "../models/User.js";
import Withdraw from "../models/Withdraw.js";

// Get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get all withdraw requests
export const getWithdraws = async (req, res) => {
  const list = await Withdraw.find().populate("user", "username email");
  res.json(list);
};

// Approve withdraw
export const approveWithdraw = async (req, res) => {
  const { id } = req.params;

  const w = await Withdraw.findById(id);
  if (!w) return res.status(404).json({ message: "Not found" });

  w.status = "approved";
  await w.save();

  res.json({ message: "Withdraw approved" });
};

// Reject withdraw (refund coins)
export const rejectWithdraw = async (req, res) => {
  const { id } = req.params;

  const w = await Withdraw.findById(id);
  if (!w) return res.status(404).json({ message: "Not found" });

  if (w.status !== "pending") {
    return res.status(400).json({ message: "Already processed" });
  }

  const user = await User.findById(w.user);

  user.coins += w.coins; // refund
  await user.save();

  w.status = "rejected";
  await w.save();

  res.json({ message: "Withdraw rejected & coins refunded" });
};

// Add coins to user
export const addCoins = async (req, res) => {
  const { userId, coins } = req.body;

  const user = await User.findById(userId);
  user.coins += Number(coins);
  await user.save();

  res.json({ message: "Coins added" });
};
