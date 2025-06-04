const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Read database URI from .env
    console.log("MongoDB Connected "); // Log success message
  } catch (error) {
    console.error(error); // Log any errors
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB; // Export function for use in server.js
