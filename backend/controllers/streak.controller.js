import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const claimStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date().toDateString();
    const last = user.lastStreakDate
      ? new Date(user.lastStreakDate).toDateString()
      : null;

    if (last === today) {
      return res.status(400).json({ message: "Already claimed today" });
    }

    // If missed day → reset
    if (last) {
      const diff =
        (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24);
      if (diff > 1) {
        user.loginStreak = 0;
      }
    }

    user.loginStreak += 1;
    if (user.loginStreak > 7) user.loginStreak = 1;

    const rewards = [20, 30, 40, 50, 60, 70, 80];
    const reward = rewards[user.loginStreak - 1];

    user.coins += reward;
    user.lastStreakDate = new Date();

    await user.save();

    await Transaction.create({
      user: user._id,
      type: "streak",
      coins: reward,
      description: `Streak Day ${user.loginStreak} reward`
    });

    res.json({
      reward,
      coins: user.coins,
      loginStreak: user.loginStreak
    });

  } catch (err) {
    console.error("STREAK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
