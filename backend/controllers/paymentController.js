const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const options = {
      amount: process.env.SUBSCRIPTION_AMOUNT || 9900, // in paise (₹99 default)
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Verify payment and update user
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const userId = req.user.userId;

  const hmac = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hmac === razorpay_signature) {
    // Set isPaid to true and record subscription time
    await User.findByIdAndUpdate(userId, { 
      isPaid: true,
      subscriptionTime: new Date() // Record when subscription was purchased
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };