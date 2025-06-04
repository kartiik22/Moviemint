const Show = require("../models/showModel");

// Get all shows (public)
const getShows = async (req, res) => {
  try {
    const adminKey = req.header("x-admin-key");
    let shows;

    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      // Admin request: include all fields including url
      shows = await Show.find();
    } else {
      // Normal user: exclude url
      shows = await Show.find().select('-url');
    }

    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get single show by ID (include url field for all users)
const getShowById = async (req, res) => {
  const showId = req.params.id;
  const adminKey = req.header("x-admin-key");

  try {
    // All users get the full show including url for video playback
    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(show);
  } catch (error) {
    console.error(error);
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
