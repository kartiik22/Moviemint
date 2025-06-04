import React from "react";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      // 1. Create Razorpay order from backend
      const res = await fetch("http://localhost:4000/api/payment/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Create order error:", text);
        alert("Failed to create order");
        return;
      }

      const order = await res.json();

      if (!order || !order.id) {
        alert("Order creation failed");
        return;
      }

      // 2. Configure Razorpay options
      const options = {
        key: "rzp_test_iq3XMe66YUCq07", // Replace with your actual Razorpay key or use env variable
        amount: order.amount,
        currency: "INR",
        name: "My Video App",
        description: "Subscription Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch("http://localhost:4000/api/payment/verify", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              const text = await verifyRes.text();
              console.error("Verify payment error:", text);
              alert("Payment verification failed");
              return;
            }

            const result = await verifyRes.json();

            if (result.success) {
              alert("✅ Payment successful! You can now access videos.");
              window.location.href = "/";
            } else {
              alert("❌ Payment failed verification.");
            }
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("Payment verification error.");
          }
        },
        prefill: {
          email: order.email || "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 4. Open Razorpay modal
      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error("Payment handler error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="payment-container" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Buy Subscription</h2>
      <p>Pay ₹99 to get full access to premium videos</p>
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
