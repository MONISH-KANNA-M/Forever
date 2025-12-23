import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mongodb.js";
import config from "./config/config.js";
import userRouter from "./routes/useroute.js";
import orderRouter from "./routes/orderroute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartroute.js";
import User from "./models/usermodel.js";
import Product from "./models/productmodel.js";
import Order from "./models/ordermodel.js";
import { authenticateToken } from "./middleware/auth.js";
import { authenticateAdmin } from "./middleware/adminAuth.js";
import { testCloudinaryConnection } from "./config/cloudinary.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.server.port;

// Debug environment variables
console.log("Environment variables:");
console.log("PORT:", config.server.port);
console.log("MONGODB_URI:", config.mongodb.uri ? "Set" : "Not set");
console.log("JWT_SECRET:", config.jwt.secret ? "Set" : "Not set");
console.log("CLOUDINARY:", config.cloudinary.cloud_name ? "Set" : "Not set");

// Middleware
app.use(cors(config.cors));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Test Cloudinary connection
testCloudinaryConnection();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
    services: {
      mongodb:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      cloudinary: "configured", // We'll test this separately
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
