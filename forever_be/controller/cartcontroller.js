import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";

// ✅ Place Order using Stripe (Mock)
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: true,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(201)
      .json({ success: true, message: "Stripe order placed", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place Stripe order",
        error: error.message,
      });
  }
};

// ✅ Place Order using Razorpay (Mock)
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(201)
      .json({
        success: true,
        message: "Razorpay order placed",
        order: newOrder,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place Razorpay order",
        error: error.message,
      });
  }
};

// ✅ Get All Orders (Admin)
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({
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
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch user orders",
        error: error.message,
      });
  }
};

// ✅ Update Order Status (Admin)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update status",
        error: error.message,
      });
  }
};
