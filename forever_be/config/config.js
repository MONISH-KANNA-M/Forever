import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const config = {
  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/forever",
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "7d",
  },

  // Cloudinary Configuration
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },

  // CORS Configuration
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  },
};

export default config;
