"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "../slices/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import Home from "./Home"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/login", { email, password })
      dispatch(login(data.token))
      navigate("/")
    } catch (error) {
      alert("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }
  if (!token) {
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay">
          <div className="login-header">
            <h1 className="netflix-logo">NETFLIX</h1>
          </div>

          <div className="login-form-container">
            <div className="login-form-wrapper">
              <h2 className="login-title">Sign In</h2>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email or phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="login-help">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="help-link">
                  Need help?
                </a>
              </div>

              <div className="signup-link">
                <span className="signup-text">New to Netflix? </span>
                <Link to="/signup" className="signup-link-text">
                  Sign up now
                </Link>
              </div>

              <div className="recaptcha-text">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        
        .login-background {
          min-height: 100vh;
          background: linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          ),
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23141414" width="1200" height="800"/><rect fill="%23e50914" x="100" y="100" width="200" height="150" opacity="0.1"/><rect fill="%23e50914" x="400" y="200" width="300" height="200" opacity="0.05"/><rect fill="%23e50914" x="800" y="50" width="250" height="180" opacity="0.08"/></svg>');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
        }
        
        .login-overlay {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .login-header {
          padding: 20px 50px;
        }
        
        .netflix-logo {
          color: #e50914;
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
          letter-spacing: 2px;
        }
        
        .login-form-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .login-form-wrapper {
          background: rgba(0, 0, 0, 0.75);
          padding: 60px 68px 40px;
          border-radius: 4px;
          width: 100%;
          max-width: 450px;
          box-sizing: border-box;
        }
        
        .login-title {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 28px;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .input-group {
          position: relative;
        }
        
        .login-input {
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
        
        .login-input::placeholder {
          color: #8c8c8c;
          font-size: 16px;
        }
        
        .login-input:focus {
          background: #454545;
        }
        
        .login-button {
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
        
        .login-button:hover:not(:disabled) {
          background: #f40612;
        }
        
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .login-help {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          font-size: 13px;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b3b3b3;
        }
        
        .remember-me input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }
        
        .help-link {
          color: #b3b3b3;
          text-decoration: none;
        }
        
        .help-link:hover {
          text-decoration: underline;
        }
        
        .signup-link {
          margin-top: 80px;
          color: #737373;
          font-size: 16px;
        }
        
        .signup-link-text {
          color: #fff;
          text-decoration: none;
        }
        
        .signup-link-text:hover {
          text-decoration: underline;
        }
        
        .recaptcha-text {
          color: #8c8c8c;
          font-size: 13px;
          margin-top: 16px;
          line-height: 1.4;
        }
        
        @media (max-width: 740px) {
          .login-header {
            padding: 20px 20px;
          }
          
          .netflix-logo {
            font-size: 2rem;
          }
          
          .login-form-wrapper {
            padding: 48px 28px;
            background: rgba(0, 0, 0, 0.85);
          }
          
          .login-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  )
}

if(token){
  return (
    <div>
      <Home/>
    </div>
  )
}
}
export default Login
