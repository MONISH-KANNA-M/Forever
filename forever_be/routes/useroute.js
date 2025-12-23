import express from "express";
import { body } from "express-validator";
import {
  loginUser,
  registerUser,
  adminLogin,
  getProfile,
  updateProfile,
} from "../middleware/usercontroller.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

// Validation middleware
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
];

// Routes
userRouter.post("/register", registerValidation, registerUser);
userRouter.post("/login", loginValidation, loginUser);
userRouter.post("/admin", loginValidation, adminLogin);
userRouter.get("/profile", authenticateToken, getProfile);
userRouter.put("/profile", authenticateToken, updateProfileValidation, updateProfile);

export default userRouter;
