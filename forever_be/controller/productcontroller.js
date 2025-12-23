import Product from "../models/productModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";
import { cleanupUploads } from "../middleware/multer.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one product image",
      });
    }

    // Extract image files
    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one valid image",
      });
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          return await uploadToCloudinary(file);
        } catch (error) {
          console.error(`Failed to upload ${file.originalname}:`, error);
          throw error;
        }
      })
    );

    // Extract URLs from upload results
    const imageUrls = imageUploads.map((upload) => upload.url);

    // Create product
    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      image: imageUrls,
      category,
      subcategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      date: Date.now(),
    });

    await product.save();

    // Clean up uploaded files
    cleanupUploads(req.files);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      cleanupUploads(req.files);
    }

    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
    });
  }
};

// List all Products
const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query;

    let query = {};

    // Add category filter
    if (category) {
      query.category = category;
    }

    // Add search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error listing products:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// Remove Product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete images from Cloudinary if they exist
    if (product.image && product.image.length > 0) {
      // Note: This would require storing public_ids in the product model
      // For now, we'll just delete the product
      console.log("Product images would be deleted from Cloudinary");
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// Get Single Product by ID
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// Get Bestseller Products
const getBestsellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ bestseller: true })
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching bestseller products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bestseller products",
    });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  getBestsellerProducts,
};
