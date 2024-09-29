import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../api/router/auth.router.js";
import userRoutes from "../api/router/user.router.js";
const app = express();
app.use(express.json());
app.use(cors());
configDotenv.apply();
const connectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT;

mongoose.connect(connectionString).then(() => {
  console.log("Database connected successfully"),
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
