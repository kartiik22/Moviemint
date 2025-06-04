const Show = require("../models/showModel");

// Get all shows (public)
const User = require("../models/User"); // Import this at top if not already

const getShows = async (req, res) => {
  try {
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

// Get single show by ID (include url field for all users)
const getShowById = async (req, res) => {
  console.log("🎬 getShowById: Called");
  console.log("🎬 getShowById: req.params.id =", req.params.id);
  console.log("🎬 getShowById: req.user =", req.user);

  const showId = req.params.id;
  const adminKey = req.header("x-admin-key");
  console.log("🎬 getShowById: x-admin-key header =", adminKey);

  try {
    let show;

    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      console.log("🎬 getShowById: Admin access granted");
      show = await Show.findById(showId);
    } else if (req.user?.isPaid) {
      // Problem: your middleware sets req.user.userId but not req.user.isPaid
      // So maybe fetch user from DB to check isPaid flag:
      console.log("🎬 getShowById: Paid user detected, userId:", req.user.userId);
      
      // Fetch user from DB to get latest isPaid value
      const userFromDb = await User.findById(req.user.userId);
      console.log("🎬 getShowById: User from DB:", userFromDb);

      if (userFromDb?.isPaid) {
        show = await Show.findById(showId);
      } else {
        console.log("🎬 getShowById: User is NOT paid");
        show = await Show.findById(showId).select("-url");
      }
    } else {
      console.log("🎬 getShowById: Unpaid or no user, hiding URL");
      show = await Show.findById(showId).select("-url");
    }

    if (!show) {
      console.log("🎬 getShowById: Show not found");
      return res.status(404).json({ message: "Show not found" });
    }

    console.log("🎬 getShowById: Show found:", show);
    console.log("🎬 getShowById: Show URL:", show.url);

    res.status(200).json(show);
  } catch (error) {
    console.error("🎬 getShowById: Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Create a new show (admin only)
const createShow = async (req, res) => {
  const { name, image, rating, description , url } = req.body;

  if (!name || !image || !rating || !description || !url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newShow = new Show({ name, image, rating, description , url });
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (error) {
    console.error(error); // 
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
