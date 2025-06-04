import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Add this import

// Simple icon components to replace Lucide icons
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

function NetflixShowsGrid() {
  const [shows, setShows] = useState([])
  const [filteredShows, setFilteredShows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    const filtered = shows.filter(
      (show) =>
        show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredShows(filtered)
  }, [shows, searchTerm])

  const fetchShows = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:4000/api/shows")
      if (!response.ok) {
        throw new Error("Failed to fetch shows")
      }
      const data = await response.json()
      setShows(data)
      setFilteredShows(data)
    } catch (err) {
      setError("Failed to load shows. Please try again later.")
      console.error("Error fetching shows:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/280x200?text=No+Image`
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          backgroundColor: "#141414",
          color: "white",
        }}
      >
        <div style={{ fontSize: "18px" }}>Loading shows...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          backgroundColor: "#141414",
          color: "#e50914",
        }}
      >
        <div style={{ fontSize: "18px" }}>{error}</div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#e50914",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Netflix Shows
        </h1>

        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#999",
            }}
          >
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search shows..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "12px 15px 12px 45px",
              backgroundColor: "#333",
              border: "2px solid #555",
              borderRadius: "25px",
              color: "white",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#e50914")}
            onBlur={(e) => (e.target.style.borderColor = "#555")}
          />
        </div>
      </div>

      {/* Results Count */}
      <div
        style={{
          color: "#999",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {searchTerm && (
          <p>
            Found {filteredShows.length} show{filteredShows.length !== 1 ? "s" : ""} for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Shows Grid */}
      {filteredShows.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#999",
            fontSize: "18px",
            marginTop: "50px",
          }}
        >
          {searchTerm ? "No shows found matching your search." : "No shows available."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {filteredShows.map((show) => (
            // WRAP EACH CARD WITH LINK - THIS IS THE KEY CHANGE
            <Link 
              key={show._id}
              to={`/show/${show._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#222",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(229, 9, 20, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {/* Show Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#333",
                  }}
                >
                  <img
                    src={show.image || "https://via.placeholder.com/280x200?text=No+Image"}
                    alt={show.name}
                    onError={handleImageError}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Rating Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "#ffd700",
                      padding: "4px 8px",
                      borderRadius: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    <StarIcon />
                    {show.rating}
                  </div>
                </div>

                {/* Show Info */}
                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      lineHeight: "1.2",
                    }}
                  >
                    {show.name}
                  </h3>

                  <p
                    style={{
                      color: "#999",
                      fontSize: "14px",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {show.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NetflixShowsGrid