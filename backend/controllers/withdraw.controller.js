import User from "../models/User.js";
import Withdraw from "../models/Withdraw.js";
import Transaction from "../models/Transaction.js";

export const requestWithdraw = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { coins, method, account } = req.body;

    if (!coins || coins < 1000) {
      return res.status(400).json({ message: "Minimum withdraw is 1000 coins (₹10)" });
    }

    if (!method || !account) {
      return res.status(400).json({ message: "Payment method and account required" });
    }

    if (user.coins < coins) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    const amount = coins / 100;

    user.coins -= coins;
    await user.save();

    const withdraw = await Withdraw.create({
      user: user._id,
      coins,
      amount,
      method,
      account
    });

    // Save transaction
    await Transaction.create({
      user: user._id,
      type: "withdraw",
      coins: -coins,
      description: `Withdraw request ₹${amount} via ${method}`
    });

    res.json({
      message: "Withdraw request submitted",
      coins: user.coins,
      withdraw
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
