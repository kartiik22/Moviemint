"use client"

import { useState, useEffect } from "react"

const SubscriptionPage = () => {
  const [isPaid, setIsPaid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchIsPaid() {
    try {
      console.log("Checking user payment status...")
      const token = localStorage.getItem("token")
      
      if (!token) {
        console.log("No token found - user not logged in")
        setIsPaid(false)
        setLoading(false)
        return
      }

      console.log("Token found, making API call...")
      const response = await fetch("http://localhost:4000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        console.error("Failed to fetch user info:", response.status)
        setError(`API Error: ${response.status}`)
        setIsPaid(false)
        setLoading(false)
        return
      }

      const data = await response.json()
      console.log("User data received:", data)
      console.log("isPaid value:", data.isPaid)
      console.log("isPaid type:", typeof data.isPaid)
      
      // Handle undefined/null isPaid values
      if (data.isPaid === undefined || data.isPaid === null) {
        console.log("isPaid is undefined/null, defaulting to false")
        setIsPaid(false)
      } else {
        setIsPaid(data.isPaid === true)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching isPaid:", error)
      setError(error.message)
      setIsPaid(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIsPaid()
  }, [])

  const handlePayment = async () => {
    try {
      // 1. Create Razorpay order from backend
      const res = await fetch("http://localhost:4000/api/payment/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("Create order error:", text)
        alert("Failed to create order")
        return
      }

      const order = await res.json()

      if (!order || !order.id) {
        alert("Order creation failed")
        return
      }

      // 2. Configure Razorpay options
      const options = {
        key: "rzp_test_iq3XMe66YUCq07", // Replace with your actual Razorpay key or use env variable
        amount: order.amount,
        currency: "INR",
        name: "MOVIEMINT",
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
            })

            if (!verifyRes.ok) {
              const text = await verifyRes.text()
              console.error("Verify payment error:", text)
              alert("Payment verification failed")
              return
            }

            const result = await verifyRes.json()

            if (result.success) {
              alert("✅ Payment successful! You can now access videos.")
              window.location.href = "/"
            } else {
              alert("❌ Payment failed verification.")
            }
          } catch (err) {
            console.error("Error verifying payment:", err)
            alert("Payment verification error.")
          }
        },
        prefill: {
          email: order.email || "user@example.com",
        },
        theme: {
          color: "#E50914",
        },
      }

      // 4. Open Razorpay modal
      const razor = new window.Razorpay(options)
      razor.open()
    } catch (err) {
      console.error("Payment handler error:", err)
      alert("Something went wrong.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading... Please check console for debug info</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => {setError(null); setLoading(true); fetchIsPaid()}}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (isPaid === true) {
    return (
      <div style={{
        backgroundColor: '#141414',
        minHeight: '100vh',
        fontFamily: "'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        padding: '20px',
        paddingTop: '90px'
      }}>
        {/* Netflix-style background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(229, 9, 20, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(229, 9, 20, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          {/* Logo */}
          <div style={{
            color: '#E50914',
            fontSize: '48px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginBottom: '20px'
          }}>
            
          </div>

          {/* Success checkmark */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#46d369',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            fontSize: '40px',
            color: 'white',
            boxShadow: '0 0 30px rgba(70, 211, 105, 0.4)'
          }}>
            ✓
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome, Premium Member!
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '20px',
            color: '#cccccc',
            marginBottom: '40px',
            lineHeight: '1.4'
          }}>
            Your subscription is active and ready to stream.
            
          </p>

          {/* Premium features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '50px'
          }}>
            {[
              { icon: '🎬', title: 'Unlimited Streaming', desc: 'Watch as much as you want' },
              { icon: '📱', title: 'Any Device', desc: 'Phone, tablet, laptop & TV' },
              { icon: '🔥', title: 'HD Quality', desc: 'Crystal clear streaming' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{fontSize: '30px', marginBottom: '10px'}}>{feature.icon}</div>
                <div style={{fontWeight: 'bold', marginBottom: '5px', fontSize: '16px'}}>{feature.title}</div>
                <div style={{color: '#cccccc', fontSize: '14px'}}>{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => window.location.href = "/"}
              style={{
                backgroundColor: '#E50914',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
                minWidth: '200px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f40612'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(229, 9, 20, 0.6)'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#E50914'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(229, 9, 20, 0.4)'
              }}
            >
              🎬 Start Watching
            </button>
            
            <button 
              onClick={() => window.location.href = "/account"}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.borderColor = '#ffffff'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
            >
              ⚙️ Manage Account
            </button>
          </div>

          {/* Status indicator */}
          <div style={{
            marginTop: '40px',
            padding: '15px 25px',
            backgroundColor: 'rgba(70, 211, 105, 0.1)',
            border: '1px solid rgba(70, 211, 105, 0.3)',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <span style={{color: '#46d369', fontWeight: 'bold'}}>● ACTIVE</span>
            <span style={{color: '#cccccc', marginLeft: '10px'}}>Premium Subscription</span>
          </div>
        </div>
      </div>
    )
  }

  // Add debugging info for unpaid users
  if (isPaid === false) {
    console.log("User is not paid, showing subscription page")
  }

  return (
    <div className="subscription-page">
      <style jsx>{`
        .subscription-page {
          background-color: #141414;
          color: #ffffff;
          min-height: 100vh;
          font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header {
          width: 100%;
          max-width: 1200px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 40px;
        }

        .logo {
          color: #E50914;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .subscription-container {
          width: 100%;
          max-width: 800px;
          background-color: rgba(0, 0, 0, 0.75);
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .subscription-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
        }

        .subscription-subtitle {
          font-size: 18px;
          color: #cccccc;
          margin-bottom: 40px;
          text-align: center;
        }

        .plan-card {
          background: linear-gradient(135deg, #1f1f1f 0%, #0f0f0f 100%);
          border-radius: 8px;
          padding: 30px;
          margin-bottom: 30px;
          border: 2px solid #E50914;
          position: relative;
          overflow: hidden;
        }

        .plan-badge {
          position: absolute;
          top: 15px;
          right: -30px;
          background-color: #E50914;
          color: white;
          padding: 5px 30px;
          transform: rotate(45deg);
          font-size: 12px;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .plan-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .plan-price {
          font-size: 42px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #E50914;
        }

        .plan-price-period {
          font-size: 16px;
          color: #cccccc;
          margin-bottom: 20px;
        }

        .plan-features {
          list-style-type: none;
          padding: 0;
          margin: 0 0 30px 0;
        }

        .plan-features li {
          padding: 10px 0;
          display: flex;
          align-items: center;
          color: #cccccc;
        }

        .plan-features li:before {
          content: "✓";
          color: #E50914;
          margin-right: 10px;
          font-weight: bold;
        }

        .subscribe-button {
          background-color: #E50914;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
        }

        .subscribe-button:hover {
          background-color: #f40612;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(229, 9, 20, 0.4);
        }

        .subscribe-button:active {
          transform: translateY(0);
        }

        .guarantee {
          text-align: center;
          margin-top: 20px;
          color: #cccccc;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .subscription-container {
            padding: 25px;
            max-width: 100%;
          }

          .subscription-title {
            font-size: 26px;
          }

          .subscription-subtitle {
            font-size: 16px;
            margin-bottom: 30px;
          }

          .plan-card {
            padding: 20px;
          }

          .plan-name {
            font-size: 20px;
          }

          .plan-price {
            font-size: 36px;
          }

          .plan-features li {
            font-size: 14px;
          }

          .subscribe-button {
            padding: 14px 28px;
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 15px 0;
            margin-bottom: 20px;
          }

          .logo {
            font-size: 24px;
          }

          .subscription-container {
            padding: 20px 15px;
          }

          .subscription-title {
            font-size: 22px;
          }

          .subscription-subtitle {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .plan-card {
            padding: 15px;
          }

          .plan-price {
            font-size: 32px;
          }

          .plan-badge {
            font-size: 10px;
            padding: 3px 25px;
            top: 10px;
            right: -25px;
          }

          .subscribe-button {
            padding: 12px 24px;
            font-size: 16px;
          }
        }
      `}</style>

      <div className="header">
        <div className="logo">MOVIEMINT</div>
      </div>

      <div className="subscription-container">
        <h1 className="subscription-title">Choose Your Plan</h1>
        <p className="subscription-subtitle">Unlimited access to all premium content</p>

        <div className="plan-card">
          <div className="plan-badge">POPULAR</div>
          <div className="plan-name">Premium Subscription</div>
          <div className="plan-price">₹99</div>
          <div className="plan-price-period">per month</div>

          <ul className="plan-features">
            <li>Unlimited access to all videos</li>
            <li>Watch on any device</li>
            <li>HD available</li>
            <li>Cancel anytime</li>
            <li>First month special offer</li>
          </ul>

          <button onClick={handlePayment} className="subscribe-button">
            Subscribe Now
          </button>
        </div>

        <p className="guarantee">No contracts, no commitments. Cancel online anytime.</p>
      </div>
    </div>
  )
}

export default SubscriptionPage