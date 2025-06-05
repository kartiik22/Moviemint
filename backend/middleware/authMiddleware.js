const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("🔐 AuthMiddleware: Start");

  const authHeader = req.headers.authorization;
  console.log("🔐 AuthMiddleware: Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("🔐 AuthMiddleware: No token or malformed header");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔐 AuthMiddleware: Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔐 AuthMiddleware: Token decoded:", decoded);

    // Adjust this based on your token payload
    req.user = { userId: decoded.userId || decoded.id || decoded.userID };
    console.log("🔐 AuthMiddleware: req.user set to:", req.user);

    next();
    console.log("🔐 AuthMiddleware: next() called, passing control");
  } catch (error) {
    console.log("🔐 AuthMiddleware: Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


module.exports = authMiddleware;
