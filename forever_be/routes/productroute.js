import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  getBestsellerProducts,
} from "../controller/productcontroller.js";
import { upload } from "../middleware/multer.js";
import { authenticateToken } from "../middleware/auth.js";
import { authenticateAdmin } from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/list", listProducts);
productRouter.get("/single/:id", singleProduct);
productRouter.get("/bestseller", getBestsellerProducts);

// Admin routes (require authentication)
productRouter.post(
  "/add",
  authenticateToken,
  authenticateAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.delete(
  "/remove/:id",
  authenticateToken,
  authenticateAdmin,
  removeProduct
);

export default productRouter;
