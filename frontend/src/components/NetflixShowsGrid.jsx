import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import config from '../config/config'

// Professional icon components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#ffd700"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
)

function NetflixShowsGrid() {
  const [shows, setShows] = useState([])
  const [filteredShows, setFilteredShows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortOrder, setSortOrder] = useState("default") // default, highToLow, lowToHigh
  const [loadingRatings, setLoadingRatings] = useState(false)

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    const filtered = shows.filter(
      (show) =>
        show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    let sorted = [...filtered]
    
    if (sortOrder === "highToLow") {
      sorted = sorted.sort((a, b) => b.rating - a.rating)
    } else if (sortOrder === "lowToHigh") {
      sorted = sorted.sort((a, b) => a.rating - b.rating)
    }
    
    setFilteredShows(sorted)
  }, [shows, searchTerm, sortOrder])

  const fetchShows = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${config.BACKEND_URL}/api/shows`)
      if (!response.ok) {
        throw new Error("Failed to fetch shows")
      }
      const data = await response.json()
      
      // Set initial data
      setShows(data)
      setFilteredShows(data)
      
      // Fetch ratings for each show
      fetchRatingsForShows(data)
    } catch (err) {
      setError("Failed to load shows. Please try again later.")
      console.error("Error fetching shows:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRatingsForShows = async (showsData) => {
    setLoadingRatings(true)
    
    try {
      // Create a copy of shows to update with API ratings
      const updatedShows = [...showsData]
      
      // Process shows in batches to avoid too many simultaneous requests
      const batchSize = 5
      for (let i = 0; i < updatedShows.length; i += batchSize) {
        const batch = updatedShows.slice(i, i + batchSize)
        
        // Create an array of promises for this batch
        const batchPromises = batch.map(async (show) => {
          try {
            // Replace with actual API endpoint for each show's rating
            const response = await fetch(`${config.BACKEND_URL}/${show._id}/rating`)
            
            if (response.ok) {
              const ratingData = await response.json()
              // Update the show with the fetched rating
              return {
                ...show,
                rating: ratingData.rating || show.rating // Fallback to existing rating if API fails
              }
            }
            return show
          } catch (error) {
            console.error(`Error fetching rating for ${show.name}:`, error)
            return show
          }
        })
        
        // Wait for all promises in this batch to resolve
        const updatedBatch = await Promise.all(batchPromises)
        
        // Update the corresponding shows in the updatedShows array
        updatedBatch.forEach((updatedShow, index) => {
          updatedShows[i + index] = updatedShow
        })
      }
      
      // Update state with all shows that now have updated ratings
      setShows(updatedShows)
      
    } catch (error) {
      console.error("Error fetching ratings:", error)
    } finally {
      setLoadingRatings(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
  }

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/280x200?text=No+Image`
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="netflix-loader">
          <div className="loader-animation"></div>
          <p>Loading shows...</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            background-color: #141414;
            color: white;
          }
          .netflix-loader {
            text-align: center;
          }
          .loader-animation {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(229, 9, 20, 0.3);
            border-radius: 50%;
            border-top-color: #e50914;
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error}</p>
        </div>
        <style jsx>{`
          .error-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            background-color: #141414;
            color: #e50914;
          }
          .error-message {
            text-align: center;
            font-size: 18px;
          }
          .error-message svg {
            margin-bottom: 15px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="netflix-container">
      {/* Header */}
      <header className="netflix-header">
        <h1>MOVIEMINT Shows</h1>

        {/* Search and Sort Controls */}
        <div className="controls-container">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search shows..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              <SortIcon /> Sort by Rating:
            </label>
            <select 
              id="sort-select" 
              value={sortOrder} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="highToLow">Highest to Lowest</option>
              <option value="lowToHigh">Lowest to Highest</option>
            </select>
          </div>
        </div>
      </header>

      {/* Results Count */}
      <div className="results-info">
        {searchTerm && (
          <p>
            Found {filteredShows.length} show{filteredShows.length !== 1 ? "s" : ""} for "{searchTerm}"
          </p>
        )}
        {loadingRatings && <p className="loading-ratings">Updating ratings from API...</p>}
      </div>

      {/* Shows Grid */}
      {filteredShows.length === 0 ? (
        <div className="no-results">
          {searchTerm ? "No shows found matching your search." : "No shows available."}
        </div>
      ) : (
        <div className="shows-grid">
          {filteredShows.map((show) => (
            <Link 
              key={show._id}
              to={`/show/${show._id}`}
              className="show-link"
            >
              <div className="show-card">
                {/* Show Image */}
                <div className="image-container">
                  <img
                    src={show.image || "https://via.placeholder.com/280x200?text=No+Image"}
                    alt={show.name}
                    onError={handleImageError}
                    className="show-image"
                  />

                  {/* Rating Badge */}
                  <div className="rating-badge">
                    <StarIcon />
                    <span>{show.rating?.toFixed(1) || "N/A"}</span>
                  </div>
                </div>

                {/* Show Info */}
                <div className="show-info">
                  <h3 className="show-title">{show.name}</h3>
                  <p className="show-description">{show.description}</p>
                  
                  {/* Additional metadata */}
                  <div className="show-metadata">
                    {show.year && <span className="year">{show.year}</span>}
                    {show.genre && <span className="genre">{show.genre}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .netflix-container {
          background-color: #141414;
          min-height: 100vh;
          padding: 1px;
          font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: white;
        }

        .netflix-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .netflix-header h1 {
  background: linear-gradient(
    45deg,
    #ffd1dc,
    #ffe0e9,
    #ffe7d1,
    #fff3c4,
    #fce4ec,
    #e0f7fa,
    #ffd1dc
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: 1px;
  font-family: 'Poppins', 'Arial Black', sans-serif;

  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  animation:
    gentleGradientShift 5s ease-in-out infinite,
    subtleFloat 6s ease-in-out infinite,
    softPulse 5s ease-in-out infinite;

  transform-origin: center;
  transition: all 0.3s ease;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* More animated shifting */
@keyframes gentleGradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Smooth float */
@keyframes subtleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Slight pulsing for lively text */
@keyframes softPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.015);
  }
}

.netflix-header h1:hover {
  transform: translateY(-2px) scale(1.02);
  text-shadow:
    0 2px 4px rgba(255, 193, 7, 0.2),
    0 4px 8px rgba(255, 193, 7, 0.1);
}


        .controls-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .controls-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .search-container {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .search-input {
          width: 100%;
          padding: 14px 15px 14px 45px;
          background-color: #333;
          border: 2px solid #555;
          border-radius: 4px;
          color: white;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #e50914;
          box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.25);
        }

        .sort-container {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .sort-label {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ccc;
          font-size: 14px;
        }

        .sort-select {
          background-color: #333;
          color: white;
          border: 2px solid #555;
          border-radius: 4px;
          padding: 10px 30px 10px 15px;
          font-size: 14px;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 10px top 50%;
          background-size: 12px auto;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }

        .sort-select:focus {
          border-color: #e50914;
          box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.25);
        }

        .results-info {
          color: #999;
          margin-bottom: 20px;
          text-align: center;
          font-size: 14px;
          height: 20px;
        }

        .loading-ratings {
          color: #e50914;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .no-results {
          text-align: center;
          color: #999;
          font-size: 18px;
          margin-top: 50px;
          padding: 30px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }

        .shows-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .show-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .show-card {
          background-color: #181818;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .show-card:hover {
          transform: scale(1.05);
          box-shadow: 0 14px 28px rgba(229, 9, 20, 0.2), 0 10px 10px rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          overflow: hidden;
        }

        .show-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .show-card:hover .show-image {
          transform: scale(1.1);
        }

        .rating-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.75);
          color: #ffd700;
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          font-weight: bold;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 215, 0, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .show-info {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .show-title {
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .show-description {
          color: #999;
          font-size: 14px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .show-metadata {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .year, .genre {
          font-size: 12px;
          color: #777;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default NetflixShowsGrid
