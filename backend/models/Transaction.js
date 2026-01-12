import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String, // "spin", "scratch", "streak", "withdraw"
    required: true
  },

  coins: { type: Number },
  description: { type: String }

}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
