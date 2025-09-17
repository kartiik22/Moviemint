const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");

// Signup function: Creates a new user
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectDB(process.env.MONGO_URI);
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.json({ message: "User created" }); // Success response
  } catch (error) {
    res.status(400).json({ error: "User already exists" }); // Error if email is taken
  }
};

// Login function: Authenticates user and returns JWT
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" }); // Invalid email or password
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return token and user details (excluding password)
    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        isPaid: user.isPaid
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Internal server error
  }
};
// Add this to the bottom of authController.js
const updateUserProfile = async (req, res) => {
  const { firstName, lastName } = req.body; // Remove isPaid
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName })
      },
      { new: true }
    );

    res.json({
      message: "Profile updated",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        isPaid: updatedUser.isPaid // just return it, not update it
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCurrentUser,
  // other exports like signup, login, updateUserProfile
};

module.exports = { signup, login, updateUserProfile , getCurrentUser}; // Add updateUserProfile here



