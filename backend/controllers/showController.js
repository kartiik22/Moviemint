const Show = require("../models/showModel");
const User = require("../models/User");
const connectDB = require("../config/db");

const getShows = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    const adminKey = req.header("x-admin-key");
    const authHeader = req.header("Authorization");
    let shows;

    // ✅ 1. Admin user — full access
    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      shows = await Show.find(); // include all fields
      return res.status(200).json(shows);
    }

    // ✅ 2. Authenticated user (check if paid)
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const jwt = require("jsonwebtoken");

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (user && user.isPaid) {
          shows = await Show.find(); // full access
        } else {
          shows = await Show.find().select("-url"); // hide video URL
        }

        return res.status(200).json(shows);
      } catch {
        // Invalid token or user not found
        return res.status(401).json({ message: "Unauthorized or invalid token" });
      }
    }

    // ❌ 3. Not logged in — hide URL
    shows = await Show.find().select("-url");
    return res.status(200).json(shows);

  } catch (error) {
    console.error("Error in getShows:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getShowById = async (req, res) => {
  console.log("🎬 getShowById: Called");
  //console.log("🎬 getShowById: req.params.id =", req.params.id);
  //console.log("🎬 getShowById: req.user =", req.user);

  const showId = req.params.id;
  const adminKey = req.header("x-admin-key");
  //console.log("🎬 getShowById: x-admin-key header =", adminKey);

  try {
    let show;

    // Admin bypass (if admin key matches)
    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      console.log("✅ Admin access: Full show");
      show = await Show.findById(showId);
    }

    // Authenticated user with JWT middleware
    else if (req.user?.userId) {
      //console.log("🔐 JWT Authenticated User:", req.user.userId);
      const user = await User.findById(req.user.userId);
      //console.log("📦 User from DB:", user);

      // Check if subscription is still valid (within 30 days)
      if (user?.isPaid && user?.subscriptionTime) {
        const now = new Date();
        const subscriptionDate = new Date(user.subscriptionTime);
        const daysDifference = Math.floor((now - subscriptionDate) / (1000 * 60 * 60 * 24));
        
        console.log(`📅 Subscription date: ${subscriptionDate}`);
        console.log(`📅 Days since subscription: ${daysDifference}`);

        if (daysDifference >= 30) {
          console.log("⏰ Subscription expired! Setting isPaid to false");
          // Subscription expired, set isPaid to false
          await User.findByIdAndUpdate(req.user.userId, { isPaid: false });
          console.log("❌ Expired subscription: Hiding URL");
          show = await Show.findById(showId).select("-url");
        } else {
          console.log("💰 Valid subscription: Full access");
          show = await Show.findById(showId);
        }
      } else if (user?.isPaid) {
        // isPaid is true but no subscriptionTime (shouldn't happen with new logic)
        console.log("⚠️ isPaid true but no subscriptionTime, giving access");
        show = await Show.findById(showId);
      } else {
        console.log("❌ Unpaid user: Hiding URL");
        show = await Show.findById(showId).select("-url");
      }
    }

    // Unauthenticated or invalid
    else {
      console.log("❗ No valid user or token: Hiding URL");
      show = await Show.findById(showId).select("-url");
    }

    if (!show) {
      console.log("🚫 Show not found");
      return res.status(404).json({ message: "Show not found" });
    }

    //console.log("🎬 Final Show Response:");
    res.status(200).json(show);

  } catch (error) {
    console.error("💥 Error in getShowById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new show (admin only)
const createShow = async (req, res) => {
  const { name, image, rating, description, url } = req.body;

  if (!name || !image || !rating || !description || !url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newShow = new Show({ name, image, rating, description, url });
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a show (admin only)
const updateShow = async (req, res) => {
  const showId = req.params.id;
  const { name, image, rating, description, url } = req.body;

  try {
    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { name, image, rating, description, url },
      { new: true, runValidators: true }
    );

    if (!updatedShow) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(updatedShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a show (admin only)
const deleteShow = async (req, res) => {
  const showId = req.params.id;

  try {
    const deletedShow = await Show.findByIdAndDelete(showId);

    if (!deletedShow) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({ message: "Show deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getShows, createShow, getShowById, updateShow, deleteShow };