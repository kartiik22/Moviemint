const express = require("express");
const { signup, login , updateUserProfile} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/signup", signup); // Signup route
router.post("/login", login);   // Login route
router.put("/update-profile", authMiddleware, updateUserProfile);

module.exports = router;
