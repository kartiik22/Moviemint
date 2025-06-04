// Temporary: hardcoded admin check (you can replace with JWT auth logic)
const adminMiddleware = (req, res, next) => {
    const adminKey = req.header("x-admin-key");
  
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  
    next();
  };
  
  module.exports = adminMiddleware;
  