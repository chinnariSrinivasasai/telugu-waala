import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,

  coins: { type: Number, default: 0 },

  loginStreak: { type: Number, default: 0 },
  lastStreakClaimDate: { type: Date },

  dailySpinsLeft: { type: Number, default: 5 },
  lastSpinDate: { type: Date },

  dailyScratchLeft: { type: Number, default: 5 },
  lastScratchDate: { type: Date },

  isAdmin: { type: Boolean, default: false },
  isGoogleUser: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
