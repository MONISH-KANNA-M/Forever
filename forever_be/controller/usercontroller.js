import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/usermodel.js";

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin Login (optional, if using separate Admin model)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For now, we'll use the same User model for admin
    // You can create a separate Admin model if needed
    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Admin login successful", token, admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { loginUser, registerUser, adminLogin };
