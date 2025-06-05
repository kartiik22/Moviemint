const express = require("express");
const { signup, login , updateUserProfile, getCurrentUser} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/signup", signup); // Signup route
router.post("/login", login);   // Login route
router.put("/update-profile", authMiddleware, updateUserProfile);
router.get("/me", authMiddleware, getCurrentUser);
module.exports = router;
