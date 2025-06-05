const mongoose = require("mongoose");

// Define User Schema with additional fields
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  isPaid: { type: Boolean, default: false },
  subscriptionTime: { type: Date, default: null }  // When subscription was purchased
});
module.exports = mongoose.model("User", UserSchema);