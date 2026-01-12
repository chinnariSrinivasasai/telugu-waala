import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const scratchNow = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Rewards (including better luck)
    const rewards = [0, 10, 20, 30, 40, 50];

    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    if (reward > 0) {
      user.coins += reward;
    }

    await user.save();

    await Transaction.create({
      user: user._id,
      type: "scratch",
      coins: reward,
      description: reward === 0 ? "Better luck next time" : "Scratch win"
    });

    res.json({
      reward,
      coins: user.coins
    });
  } catch (err) {
    console.error("SCRATCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
