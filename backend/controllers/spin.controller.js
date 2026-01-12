import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const spinRewards = [0, 10, 20, 30, 50]; // 0 = Duck 🦆

export const spin = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const today = new Date();
    today.setHours(0,0,0,0);

    if (user.lastSpinDate) {
      const last = new Date(user.lastSpinDate);
      last.setHours(0,0,0,0);
      if (today.getTime() !== last.getTime()) {
        user.dailySpinsLeft = 5;
      }
    }

    if (user.dailySpinsLeft <= 0) {
      return res.status(400).json({ message: "No spins left for today" });
    }

    const reward = spinRewards[Math.floor(Math.random() * spinRewards.length)];

    user.dailySpinsLeft -= 1;
    user.lastSpinDate = today;

    if (reward > 0) {
      user.coins += reward;
    }

    await user.save();

    // Save transaction
    await Transaction.create({
      user: user._id,
      type: "spin",
      coins: reward,
      description: reward === 0 ? "Duck spin" : `Spin won ${reward} coins`
    });

    res.json({
      reward,
      coins: user.coins,
      spinsLeft: user.dailySpinsLeft
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
