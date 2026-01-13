import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String
    },

    googleId: {
      type: String
    },

    coins: {
      type: Number,
      default: 0
    },

    // ===== STREAK SYSTEM =====
    loginStreak: {
      type: Number,
      default: 0
    },

    lastStreakDate: {
      type: Date
    },

    // ===== DAILY SPIN SYSTEM =====
    dailySpinCount: {
      type: Number,
      default: 0
    },

    lastSpinDate: {
      type: Date
    },

    // ===== DAILY SCRATCH SYSTEM =====
    dailyScratchCount: {
      type: Number,
      default: 0
    },

    lastScratchDate: {
      type: Date
    },

    // ===== ADMIN =====
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
