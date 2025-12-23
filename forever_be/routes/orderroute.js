import express from "express";
import {
  placeOrderStripe,
  placeOrderRazorpay,
  placeOrderCOD,
  allOrders,
  userOrders,
  updateStatus,
} from "../controller/ordercontroller.js";
import { authenticateAdmin as adminAuth } from "../middleware/adminAuth.js";
import { authenticateToken as authUser } from "../middleware/auth.js";

const orderRouter = express.Router();

// ✅ Admin Features
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.put("/status", adminAuth, updateStatus);

// ✅ Payment Features
orderRouter.post("/place/stripe", authUser, placeOrderStripe);
orderRouter.post("/place/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/place/cod", authUser, placeOrderCOD);

// ✅ User Feature
orderRouter.get("/userorders/:userId", authUser, userOrders);

export default orderRouter;
