import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NetflixShowsGrid from "../components/NetflixShowsGrid";
const Home = () => {
    const token = useSelector((state) => state.auth.token)
  
    if (!token) {
      return (
        <div className="landing">
          <div className="hero">
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Watch anywhere. Cancel anytime.</p>
            <Link to="/signup" className="cta-btn">
              Get Started
            </Link>
          </div>
        </div>
      )
    }
  
    return (
      <div className="home">
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Welcome to Netflix</h1>
            <p>Enjoy unlimited streaming of movies and TV shows</p>
            <button className="play-btn">▶ Play</button>
          </div>
        </div>
      <NetflixShowsGrid/>
      
        
      </div>
    )
  };
  export default Home;