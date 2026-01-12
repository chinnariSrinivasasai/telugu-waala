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

  coins: Number, // + or -
  description: String

}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
