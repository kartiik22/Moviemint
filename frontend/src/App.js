
import Signup from './pages/Signup'; 
import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import PaymentPage from "./pages/PaymentPage";

import { login, logout } from "./slices/authSlice"
import Login from "./pages/Login";
import Home from './pages/Home';
import NetflixShowPage from './components/NetflixShowPage';
// Simple Navbar
const Navbar = () => {
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        NETFLIX
      </Link>
      <div className="nav-right">
        {!token ? (
          <Link to="/login" className="sign-in-btn">
            Sign In
          </Link>
        ) : (
          <button onClick={() => dispatch(logout())} className="logout-btn">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  )
}

// Simple Home Component
<Home/>

// Main App
// Make sure this exists and is default exported

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/show/:id" element={<NetflixShowPage />} />
          

<Route path="/buy" element={<PaymentPage />} />

        </Routes>
      </BrowserRouter>


      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background: #141414;
          color: white;
        }

        .app {
          min-height: 100vh;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          background: rgba(0,0,0,0.9);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 100;
        }

        .logo {
          color: #e50914;
          font-size: 2rem;
          font-weight: bold;
          text-decoration: none;
        }

        .sign-in-btn, .logout-btn {
          background: #e50914;
          color: white;
          padding: 8px 20px;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          font-size: 14px;
        }

        .sign-in-btn:hover, .logout-btn:hover {
          background: #f40612;
        }

        /* Landing Page */
        .landing {
          padding-top: 80px;
          min-height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                      #141414;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero {
          text-align: center;
          max-width: 600px;
          padding: 0 20px;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .hero p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: #ccc;
        }

        .cta-btn {
          background: #e50914;
          color: white;
          padding: 15px 30px;
          font-size: 1.2rem;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
        }

        .cta-btn:hover {
          background: #f40612;
        }

        /* Home Page */
        .home {
          padding-top: 80px;
          min-height: 100vh;
        }

        .hero-banner {
          height: 400px;
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                      url('/placeholder.svg?height=400&width=800');
          background-size: cover;
          display: flex;
          align-items: center;
          padding: 0 50px;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 400px;
        }

        .play-btn {
          background: white;
          color: black;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        }

        .play-btn:hover {
          background: #ccc;
        }

        .content {
          padding: 50px;
        }

        .content h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .movie-card {
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .movie-card:hover {
          transform: scale(1.05);
        }

        .movie-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        /* Auth Pages */
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                      #141414;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-form {
          background: rgba(0,0,0,0.8);
          padding: 40px;
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
        }

        .auth-form h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .auth-form input {
          width: 100%;
          padding: 15px;
          margin-bottom: 20px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 16px;
        }

        .auth-form input::placeholder {
          color: #999;
        }

        .auth-form button {
          width: 100%;
          background: #e50914;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .auth-form button:hover:not(:disabled) {
          background: #f40612;
        }

        .auth-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-form p {
          text-align: center;
          color: #ccc;
        }

        .auth-form a {
          color: #e50914;
          text-decoration: none;
        }

        .auth-form a:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            padding: 15px 20px;
          }

          .logo {
            font-size: 1.5rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1.2rem;
          }

          .hero-banner {
            padding: 0 20px;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .content {
            padding: 30px 20px;
          }

          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
          }

          .auth-form {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default App
