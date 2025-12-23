import jwt from "jsonwebtoken";

// Middleware to verify admin JWT token
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Admin access token required" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid admin token" });
      }

      // Check if user has admin role
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      req.admin = user;
      next();
    }
  );
};

export { authenticateAdmin };
