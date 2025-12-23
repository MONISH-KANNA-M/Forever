import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// Test Cloudinary connection
const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Cloudinary connection error:", error.message);
    console.error("Please check your CLOUDINARY credentials in .env file");
    return false;
  }
};

// Upload image to Cloudinary
const uploadToCloudinary = async (file, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
      folder: "forever_products",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
      ...options,
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary delete error:", error.message);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

export {
  cloudinary,
  testCloudinaryConnection,
  uploadToCloudinary,
  deleteFromCloudinary,
};
