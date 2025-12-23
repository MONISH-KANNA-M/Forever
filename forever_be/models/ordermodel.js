import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "online"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      default: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    estimatedDelivery: {
      type: Date,
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
