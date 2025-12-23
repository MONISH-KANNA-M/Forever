import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";

// ✅ Place Order using Stripe (Mock)
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    const newOrder = new orderModel({
      user: req.user.userId,
      items,
      shippingAddress,
      paymentMethod: "stripe",
      totalAmount,
      finalAmount: totalAmount,
      paymentStatus: "completed",
      orderStatus: "pending",
    });

    await newOrder.save();

    // Clear user's cart after successful order
    const user = await userModel.findById(req.user.userId);
    user.cartData = {};
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Stripe order placed", order: newOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place Stripe order",
      error: error.message,
    });
  }
};

// ✅ Place Order using Razorpay (Mock)
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    const newOrder = new orderModel({
      user: req.user.userId,
      items,
      shippingAddress,
      paymentMethod: "razorpay",
      totalAmount,
      finalAmount: totalAmount,
      paymentStatus: "completed",
      orderStatus: "pending",
    });

    await newOrder.save();

    // Clear user's cart after successful order
    const user = await userModel.findById(req.user.userId);
    user.cartData = {};
    await user.save();

    res.status(201).json({
      success: true,
      message: "Razorpay order placed",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place Razorpay order",
      error: error.message,
    });
  }
};

// ✅ Place Order using COD (Cash on Delivery)
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    const newOrder = new orderModel({
      user: req.user.userId,
      items,
      shippingAddress,
      paymentMethod: "cod",
      totalAmount,
      finalAmount: totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await newOrder.save();

    // Clear user's cart after successful order
    const user = await userModel.findById(req.user.userId);
    user.cartData = {};
    await user.save();

    res.status(201).json({
      success: true,
      message: "COD order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place COD order",
      error: error.message,
    });
  }
};

// ✅ Get All Orders (Admin)
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ✅ Get Orders by User ID
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

// ✅ Update Order Status (Admin)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};
