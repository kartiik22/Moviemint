"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import Home from "./Home"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      await axios.post("http://localhost:4000/api/auth/signup", { email, password })
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error)  // Shows "User already exists"
      } else {
        alert("Signup failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }
  
  if (!token) {
  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-overlay">
        
          <div className="signup-form-container">
            <div className="signup-form-wrapper">
              <h2 className="signup-title">Create Account</h2>
              <p className="signup-subtitle">Join Netflix today.</p>

              <form onSubmit={handleSubmit} className="signup-form">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                    required
                  />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                    required
                  />
                </div>

                <button type="submit" className="signup-button" disabled={loading}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              <div className="terms-text">By signing up, you agree to our Terms of Use and Privacy Policy.</div>

              <div className="login-link">
                <span className="login-text">Already have an account? </span>
                <Link to="/login" className="login-link-text">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          background: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        
        .signup-background {
          min-height: 100vh;
          background: linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          ),
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23141414" width="1200" height="800"/><rect fill="%23e50914" x="200" y="150" width="180" height="120" opacity="0.1"/><rect fill="%23e50914" x="500" y="250" width="250" height="180" opacity="0.05"/><rect fill="%23e50914" x="850" y="100" width="200" height="150" opacity="0.08"/></svg>');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
        }
        
        .signup-overlay {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .signup-header {
          padding: 20px 50px;
        }
        
        .netflix-logo {
          color: #e50914;
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
          letter-spacing: 2px;
        }
        
        .signup-form-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .signup-form-wrapper {
          background: rgba(0, 0, 0, 0.75);
          padding: 60px 68px 40px;
          border-radius: 4px;
          width: 100%;
          max-width: 450px;
          box-sizing: border-box;
        }
        
        .signup-title {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .signup-subtitle {
          color: #b3b3b3;
          font-size: 16px;
          margin-bottom: 28px;
        }
        
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .input-group {
          position: relative;
        }
        
        .signup-input {
          width: 100%;
          height: 50px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          padding: 16px 20px 0;
          box-sizing: border-box;
          outline: none;
        }
        
        .signup-input::placeholder {
          color: #8c8c8c;
          font-size: 16px;
        }
        
        .signup-input:focus {
          background: #454545;
        }
        
        .signup-button {
          background: #e50914;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          height: 48px;
          margin-top: 24px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .signup-button:hover:not(:disabled) {
          background: #f40612;
        }
        
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .terms-text {
          color: #8c8c8c;
          font-size: 13px;
          margin-top: 16px;
          line-height: 1.4;
        }
        
        .login-link {
          margin-top: 60px;
          color: #737373;
          font-size: 16px;
        }
        
        .login-link-text {
          color: #fff;
          text-decoration: none;
        }
        
        .login-link-text:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 740px) {
          .signup-header {
            padding: 20px 20px;
          }
          
          .netflix-logo {
            font-size: 2rem;
          }
          
          .signup-form-wrapper {
            padding: 48px 28px;
            background: rgba(0, 0, 0, 0.85);
          }
          
          .signup-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  )
}
if(token){
  return <Home/>
}
}
export default Signup
