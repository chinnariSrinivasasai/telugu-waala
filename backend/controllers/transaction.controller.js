import Transaction from "../models/Transaction.js";

export const getMyTransactions = async (req, res) => {
  try {
    const list = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    console.error("TRANSACTION HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
