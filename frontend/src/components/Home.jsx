import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NetflixShowsGrid from "../components/NetflixShowsGrid";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  
  if (!token) {
    return (
      <div className="landing">
        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="netflix-title">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="netflix-subtitle">
              Watch anywhere. Cancel anytime.
            </p>
            <Link to="/signup" className="cta-btn netflix-cta">
              Get Started
            </Link>
          </div>
          <div className="hero-background">
            <div className="gradient-overlay"></div>
          </div>
        </div>
        
        {/* Netflix-style CSS */}
        <style jsx>{`
          .landing {
            min-height: 100vh;
            background: #000000;
            position: relative;
            overflow: hidden;
          }
          
          .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.6) 50%,
              rgba(0, 0, 0, 0.8) 100%
            ),
            url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/US-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
          
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
          }
          
          .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 800px;
            padding: 0 20px;
            animation: fadeInUp 1s ease-out;
          }
          
          .netflix-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 20px;
            line-height: 1.1;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            font-family: 'Netflix Sans', 'Helvetica Neue', Arial, sans-serif;
            letter-spacing: -0.5px;
          }
          
          .netflix-subtitle {
            font-size: 1.5rem;
            color: #ffffff;
            margin-bottom: 40px;
            font-weight: 400;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            font-family: 'Netflix Sans', 'Helvetica Neue', Arial, sans-serif;
          }
          
          .netflix-cta {
            display: inline-block;
            background: #E50914;
            color: white;
            padding: 18px 40px;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Netflix Sans', 'Helvetica Neue', Arial, sans-serif;
            box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
            border: none;
            cursor: pointer;
          }
          
          .netflix-cta:hover {
            background: #f40612;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .netflix-title {
              font-size: 2.5rem;
            }
            
            .netflix-subtitle {
              font-size: 1.2rem;
              margin-bottom: 30px;
            }
            
            .netflix-cta {
              padding: 15px 30px;
              font-size: 1rem;
            }
          }
          
          @media (max-width: 480px) {
            .netflix-title {
              font-size: 2rem;
            }
            
            .netflix-subtitle {
              font-size: 1rem;
            }
            
            .hero-content {
              padding: 0 15px;
            }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="home">
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="welcome-title">Welcome to MovieMint</h1>
          <p className="welcome-subtitle">Enjoy unlimited streaming of movies and TV shows</p>
        </div>
        <div className="hero-gradient"></div>
      </div>
      <NetflixShowsGrid/>
      
      {/* Netflix-style CSS for authenticated view */}
      <style jsx>{`
        .home {
          background: #141414;
          min-height: 100vh;
        }
        
        .hero-banner {
          position: relative;
          height: 70vh;
          background: linear-gradient(
            to bottom,
            rgba(20, 20, 20, 0.4) 0%,
            rgba(20, 20, 20, 0.8) 100%
          ),
          url('https://images.unsplash.com/photo-1489599849896-e57213a3204a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 60px;
        }
        
        .hero-content {
          max-width: 600px;
          z-index: 2;
          animation: slideInLeft 1s ease-out;
        }
        
        .welcome-title {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          font-family: 'Netflix Sans', 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.2;
        }
        
        .welcome-subtitle {
          font-size: 1.3rem;
          color: #ffffff;
          font-weight: 400;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
          font-family: 'Netflix Sans', 'Helvetica Neue', Arial, sans-serif;
          margin-bottom: 0;
        }
        
        .hero-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(
            to top,
            #141414 0%,
            rgba(20, 20, 20, 0.8) 50%,
            transparent 100%
          );
          z-index: 1;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero-banner {
            padding: 0 30px;
            height: 60vh;
          }
          
          .welcome-title {
            font-size: 2.5rem;
          }
          
          .welcome-subtitle {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-banner {
            padding: 0 20px;
            height: 50vh;
          }
          
          .welcome-title {
            font-size: 2rem;
          }
          
          .welcome-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;