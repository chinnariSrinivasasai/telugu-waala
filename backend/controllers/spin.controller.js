import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const spinNow = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date().toDateString();
    const last = user.lastSpinDate
      ? new Date(user.lastSpinDate).toDateString()
      : null;

    // Reset daily count if new day
    if (last !== today) {
      user.dailySpinCount = 0;
      user.lastSpinDate = new Date();
    }

    if (user.dailySpinCount >= 5) {
      return res.status(400).json({
        message: "Daily spin limit reached. Try again tomorrow."
      });
    }

    user.dailySpinCount += 1;

    const rewards = [0, 10, 20, 30, 40, 50]; // includes duck
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    if (reward > 0) {
      user.coins += reward;
    }

    await user.save();

    await Transaction.create({
      user: user._id,
      type: "spin",
      coins: reward,
      description:
        reward === 0 ? "Duck spin" : `Spin win (${reward} coins)`
    });

    res.json({
      reward,
      coins: user.coins,
      remaining: 5 - user.dailySpinCount
    });

  } catch (err) {
    console.error("SPIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
