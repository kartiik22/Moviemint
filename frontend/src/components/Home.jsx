import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  
        <div className="content">
          <h2>Popular Movies</h2>
          <div className="movie-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="movie-card">
                <img src={`/placeholder.svg?height=300&width=200`} alt={`Movie ${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };
  export default Home;