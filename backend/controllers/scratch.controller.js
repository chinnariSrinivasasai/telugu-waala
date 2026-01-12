import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const scratchRewards = [0, 10, 20, 30, 50];

export const scratch = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const today = new Date();
    today.setHours(0,0,0,0);

    if (user.lastScratchDate) {
      const last = new Date(user.lastScratchDate);
      last.setHours(0,0,0,0);
      if (today.getTime() !== last.getTime()) {
        user.dailyScratchLeft = 5;
      }
    }

    if (user.dailyScratchLeft <= 0) {
      return res.status(400).json({ message: "No scratch cards left for today" });
    }

    const reward = scratchRewards[Math.floor(Math.random() * scratchRewards.length)];

    user.dailyScratchLeft -= 1;
    user.lastScratchDate = today;

    if (reward > 0) {
      user.coins += reward;
    }

    await user.save();

    // Save transaction
    await Transaction.create({
      user: user._id,
      type: "scratch",
      coins: reward,
      description: reward === 0 ? "Better luck next time" : `Scratch won ${reward} coins`
    });

    res.json({
      reward,
      coins: user.coins,
      scratchLeft: user.dailyScratchLeft
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
