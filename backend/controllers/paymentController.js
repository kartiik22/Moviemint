const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");


const razorpay = new Razorpay({
  key_id: "rzp_test_iq3XMe66YUCq07",
  key_secret: "yF6BlaYSzMnxucE1HHnS9Dtv",
});

const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 9900, // in paise (₹99)
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
    .createHmac("sha256", "yF6BlaYSzMnxucE1HHnS9Dtv")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hmac === razorpay_signature) {
    await User.findByIdAndUpdate(userId, { isPaid: true });
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
