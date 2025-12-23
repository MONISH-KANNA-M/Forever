import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log("✅ MongoDB connection is healthy");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("Please check your MONGODB_URI in .env file");
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

export default connectDB;
