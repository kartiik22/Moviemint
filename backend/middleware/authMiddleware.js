const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(401).json({ error: "Unauthorized" }); // No token = unauthorized

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Store decoded user info in request
    next(); // Proceed to next middleware
  } catch {
    res.status(403).json({ error: "Invalid token" }); // Token is invalid
  }
};

module.exports = authMiddleware;
