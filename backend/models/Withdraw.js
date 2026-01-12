import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  coins: Number,
  amount: Number, // in rupees

  method: {
    type: String, // "upi" or "paytm"
    required: true
  },

  account: {
    type: String, // upi id or paytm number
    required: true
  },

  status: {
    type: String,
    default: "pending" // pending, approved, rejected
  }

}, { timestamps: true });

export default mongoose.model("Withdraw", withdrawSchema);
