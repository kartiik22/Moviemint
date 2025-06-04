const mongoose = require("mongoose");

// Define User Schema with additional fields
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },       // Optional field
  lastName: { type: String, default: "" },        // Optional field
  isPaid: { type: Boolean, default: false }       // Default false
});

module.exports = mongoose.model("User", UserSchema);
