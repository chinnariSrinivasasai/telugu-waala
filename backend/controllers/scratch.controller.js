import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const scratchNow = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date().toDateString();
    const last = user.lastScratchDate
      ? new Date(user.lastScratchDate).toDateString()
      : null;

    // Reset daily count if new day
    if (last !== today) {
      user.dailyScratchCount = 0;
      user.lastScratchDate = new Date();
    }

    if (user.dailyScratchCount >= 5) {
      return res.status(400).json({
        message: "Daily scratch limit reached. Try again tomorrow."
      });
    }

    user.dailyScratchCount += 1;

    const rewards = [0, 10, 20, 30, 40, 50]; // includes better luck
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    if (reward > 0) {
      user.coins += reward;
    }

    await user.save();

    await Transaction.create({
      user: user._id,
      type: "scratch",
      coins: reward,
      description:
        reward === 0 ? "Better luck next time" : `Scratch win (${reward} coins)`
    });

    res.json({
      reward,
      coins: user.coins,
      remaining: 5 - user.dailyScratchCount
    });

  } catch (err) {
    console.error("SCRATCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
