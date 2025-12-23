import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/usermodel.js";

const cartRouter = express.Router();

// Add to cart
cartRouter.post("/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, size = "M" } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user.cartData) {
      user.cartData = {};
    }

    if (!user.cartData[productId]) {
      user.cartData[productId] = {};
    }

    if (user.cartData[productId][size]) {
      user.cartData[productId][size] += quantity;
    } else {
      user.cartData[productId][size] = quantity;
    }

    await user.save();
    res.json({
      success: true,
      message: "Added to cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
});

// Get cart
cartRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
    });
  }
});

// Update cart item quantity
cartRouter.put("/update", authenticateToken, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user.cartData) {
      user.cartData = {};
    }

    if (!user.cartData[productId]) {
      user.cartData[productId] = {};
    }

    if (quantity <= 0) {
      delete user.cartData[productId][size];
      if (Object.keys(user.cartData[productId]).length === 0) {
        delete user.cartData[productId];
      }
    } else {
      user.cartData[productId][size] = quantity;
    }

    await user.save();
    res.json({
      success: true,
      message: "Cart updated",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
});

// Remove from cart
cartRouter.delete(
  "/remove/:productId/:size",
  authenticateToken,
  async (req, res) => {
    try {
      const { productId, size } = req.params;
      const user = await User.findById(req.user.userId);

      if (user.cartData && user.cartData[productId]) {
        delete user.cartData[productId][size];

        // If no sizes left for this product, remove the product entirely
        if (Object.keys(user.cartData[productId]).length === 0) {
          delete user.cartData[productId];
        }
      }

      await user.save();
      res.json({
        success: true,
        message: "Removed from cart",
        cartData: user.cartData,
      });
    } catch (error) {
      console.error("Remove from cart error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove from cart",
      });
    }
  }
);

// Clear cart
cartRouter.delete("/clear", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.cartData = {};
    await user.save();

    res.json({
      success: true,
      message: "Cart cleared",
      cartData: {},
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
});

export default cartRouter;
