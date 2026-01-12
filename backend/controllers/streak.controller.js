import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const claimStreak = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const today = new Date();
    today.setHours(0,0,0,0);

    if (user.lastStreakClaimDate) {
      const last = new Date(user.lastStreakClaimDate);
      last.setHours(0,0,0,0);

      const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return res.status(400).json({ message: "Already claimed today" });
      }

      if (diffDays === 1) {
        user.loginStreak += 1;
        if (user.loginStreak > 7) user.loginStreak = 1;
      } else {
        user.loginStreak = 1;
      }
    } else {
      user.loginStreak = 1;
    }

    const reward = 10 + user.loginStreak * 10;

    user.coins += reward;
    user.lastStreakClaimDate = today;

    await user.save();

    // Save transaction
    await Transaction.create({
      user: user._id,
      type: "streak",
      coins: reward,
      description: `Streak day ${user.loginStreak} reward`
    });

    res.json({
      message: "Streak claimed",
      loginStreak: user.loginStreak,
      coins: user.coins,
      reward
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
