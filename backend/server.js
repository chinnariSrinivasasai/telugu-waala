import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import streakRoutes from "./routes/streak.routes.js";
import authRoutes from "./routes/auth.routes.js";
import spinRoutes from "./routes/spin.routes.js";
import scratchRoutes from "./routes/scratch.routes.js";
import withdrawRoutes from "./routes/withdraw.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Telugu Waala Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/spin", spinRoutes);
app.use("/api/scratch", scratchRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/admin", adminRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch(err => console.error(err));

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));