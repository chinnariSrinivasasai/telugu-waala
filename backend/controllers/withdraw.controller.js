import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const requestWithdraw = async (req, res) => {
  try {
    const { coins, method, account } = req.body;

    if (!coins || coins < 1000) {
      return res.status(400).json({ message: "Minimum withdraw is 1000 coins" });
    }

    if (!account) {
      return res.status(400).json({ message: "Account details required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.coins < coins) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    // Deduct coins
    user.coins -= coins;
    await user.save();

    // Save transaction
    await Transaction.create({
      user: user._id,
      type: "withdraw",
      coins: -coins,
      description: `Withdraw request via ${method} (${account})`
    });

    res.json({
      message: "Withdraw request submitted",
      coins: user.coins
    });
  } catch (err) {
    console.error("WITHDRAW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
