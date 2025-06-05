"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ReactPlayer from "react-player"

// Icon components
const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd700">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

const LoaderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinner">
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
)

function NetflixShowPage() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (id) {
      fetchShow()
    }
  }, [id])

  const fetchShow = async () => {
    try {
      setLoading(true)
  
      // Get the token from localStorage or your Redux state
      const token = localStorage.getItem("token") // or from Redux if you're using that
  
      const response = await fetch(`http://localhost:4000/api/shows/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ REQUIRED
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch show")
      }
  
      const data = await response.json()
      setShow(data)
    } catch (err) {
      setError("Failed to load show. Please try again later.")
      console.error("Error fetching show:", err)
    } finally {
      setLoading(false)
    }
  }
  

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/1200x800/333/fff?text=No+Image`
  }

  // Desktop styles (default)
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#141414",
      color: "white",
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#141414",
    },
    loadingContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "white",
      fontSize: "18px",
    },
    errorContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#141414",
    },
    errorContent: {
      textAlign: "center",
    },
    errorMessage: {
      color: "#e50914",
      fontSize: "20px",
      marginBottom: "24px",
    },
    backButtonError: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#e50914",
      color: "white",
      textDecoration: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
    },
    backButtonContainer: {
      position: "absolute",
      top: "24px",
      left: "24px",
      zIndex: 20,
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      textDecoration: "none",
      padding: "12px 20px",
      borderRadius: "25px",
      backdropFilter: "blur(10px)",
      transition: "background-color 0.3s ease",
      fontWeight: "500",
    },
    heroSection: {
      position: "relative",
      height: "50vh",
      overflow: "hidden",
    },
    heroBackground: {
      position: "absolute",
      inset: "0",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    heroOverlay: {
      position: "absolute",
      inset: "0",
      background:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(20, 20, 20, 0.9) 100%)",
    },
    heroContent: {
      position: "relative",
      height: "100%",
      display: "flex",
      alignItems: "flex-end",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 24px 32px",
    },
    heroInfo: {
      maxWidth: "600px",
    },
    showTitle: {
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: "16px",
      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
      lineHeight: "1.1",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "16px",
    },
    ratingBadge: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "8px 16px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
    },
    ratingText: {
      color: "#ffd700",
      fontWeight: "600",
      fontSize: "16px",
    },
    showDescription: {
      color: "#cccccc",
      fontSize: "16px",
      lineHeight: "1.6",
      maxWidth: "500px",
    },
    contentSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 24px 48px",
    },
    videoSection: {
      backgroundColor: "rgba(45, 45, 45, 0.8)",
      border: "1px solid #333",
      borderRadius: "12px",
      padding: "32px",
      backdropFilter: "blur(10px)",
      marginBottom: "48px",
    },
    videoTitle: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "24px",
      color: "white",
      borderBottom: "2px solid #e50914",
      paddingBottom: "12px",
    },
    videoContainer: {
      position: "relative",
      width: "100%",
      height: "500px",
      backgroundColor: "#000",
      borderRadius: "8px",
      overflow: "hidden",
    },
    reactPlayer: {
      borderRadius: "8px",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "48px",
    },
    infoCard: {
      backgroundColor: "rgba(45, 45, 45, 0.8)",
      border: "1px solid #333",
      borderRadius: "12px",
      padding: "32px",
      backdropFilter: "blur(10px)",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "24px",
      color: "white",
      borderBottom: "2px solid #e50914",
      paddingBottom: "12px",
    },
    detailsList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    detailItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailLabel: {
      fontWeight: "600",
      color: "white",
    },
    detailValue: {
      color: "#cccccc",
    },
    ratingDisplay: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    showId: {
      fontFamily: '"Courier New", monospace',
      fontSize: "14px",
      backgroundColor: "#333",
      padding: "4px 8px",
      borderRadius: "4px",
    },
    cardDescription: {
      color: "#cccccc",
      lineHeight: "1.6",
      fontSize: "16px",
    },
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <LoaderIcon />
          <span>Loading show...</span>
        </div>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .spinner {
              animation: spin 1s linear infinite;
            }
          `}
        </style>
      </div>
    )
  }

  if (error || !show) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <div style={styles.errorMessage}>{error || "Show not found"}</div>
          <Link
            to="/"
            style={styles.backButtonError}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f40612")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#e50914")}
          >
            <ArrowLeftIcon />
            Back to Shows
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={styles.container} className="netflix-show-page">
        {/* Back Button */}
        <div style={styles.backButtonContainer} className="back-button-container">
          <Link
            to="/"
            style={styles.backButton}
            className="back-button"
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.9)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)")}
          >
            <ArrowLeftIcon />
            Back to Shows
          </Link>
        </div>

        {/* Hero Section */}
        <div style={styles.heroSection} className="hero-section">
          <div style={styles.heroBackground}>
            <img
              src={show.image || "https://via.placeholder.com/1200x800/333/fff?text=No+Image"}
              alt={show.name}
              onError={handleImageError}
              style={styles.heroImage}
            />
            <div style={styles.heroOverlay}></div>
          </div>

          <div style={styles.heroContent} className="hero-content">
            <div style={styles.heroInfo}>
              <h1 style={styles.showTitle} className="show-title">
                {show.name}
              </h1>

              <div style={styles.ratingContainer}>
                <div style={styles.ratingBadge} className="rating-badge">
                  <StarIcon />
                  <span style={styles.ratingText}>{show.rating}/5</span>
                </div>
              </div>

              <p style={styles.showDescription} className="show-description">
                {show.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.contentSection} className="content-section">
          {/* Video Player Section */}
          {show.url && (
            <div style={styles.videoSection} className="video-section">
              <h2 style={styles.videoTitle} className="video-title">
                Watch Now
              </h2>
              <div style={styles.videoContainer} className="video-container">
                <ReactPlayer
                  url={show.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={false}
                  volume={0.8}
                  muted={false}
                  pip={true}
                  stopOnUnmount={false}
                  style={styles.reactPlayer}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 0,
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        playsinline: 1,
                      },
                    },
                    vimeo: {
                      playerOptions: {
                        byline: false,
                        portrait: false,
                        title: false,
                        responsive: true,
                      },
                    },
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                        disablePictureInPicture: false,
                        playsInline: true,
                        preload: "metadata",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* Info Cards Grid */}
          <div style={styles.contentGrid} className="content-grid">
            {/* Show Details Card */}
            <div style={styles.infoCard} className="info-card">
              <h2 style={styles.cardTitle}>Show Details</h2>
              <div style={styles.detailsList}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Title:</span>
                  <span style={styles.detailValue}>{show.name}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Rating:</span>
                  <div style={styles.ratingDisplay}>
                    <StarIcon />
                    <span style={styles.detailValue}>{show.rating}/5</span>
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>ID:</span>
                  <span style={{ ...styles.detailValue, ...styles.showId }}>{show._id}</span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div style={styles.infoCard} className="info-card">
              <h2 style={styles.cardTitle}>Description</h2>
              <p style={styles.cardDescription}>{show.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Media Queries for Mobile */}
      <style>
        {`
          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .netflix-show-page {
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }

            .hero-section {
              height: 40vh !important;
            }

            .show-title {
              font-size: 2.2rem !important;
              line-height: 1.2 !important;
            }

            .show-description {
              font-size: 16px !important;
              margin-bottom: 16px !important;
            }

            .hero-content {
              padding: 0 20px 24px !important;
            }

            .content-section {
              padding: 0 20px 40px !important;
            }

            .content-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }

            .info-card, .video-section {
              padding: 24px !important;
            }

            .video-container {
              height: 300px !important;
            }

            .video-title, .card-title {
              font-size: 22px !important;
            }

            .card-description, .detail-label, .detail-value {
              font-size: 15px !important;
            }

            .rating-badge {
              padding: 8px 14px !important;
            }

            .rating-text {
              font-size: 15px !important;
            }
          }

          /* Small Mobile Optimizations */
          @media (max-width: 480px) {
            .hero-section {
              height: 35vh !important;
            }

            .show-title {
              font-size: 1.8rem !important;
            }

            .show-description {
              font-size: 14px !important;
            }

            .back-button-container {
              top: 12px !important;
              left: 12px !important;
            }

            .back-button {
              padding: 10px 16px !important;
              font-size: 14px !important;
            }

            .hero-content {
              padding: 0 16px 20px !important;
            }

            .content-section {
              padding: 0 16px 32px !important;
            }

            .content-grid {
              gap: 16px !important;
            }

            .info-card, .video-section {
              padding: 20px !important;
            }

            .video-container {
              height: 220px !important;
            }

            .video-title, .card-title {
              font-size: 20px !important;
            }

            .card-description, .detail-label, .detail-value {
              font-size: 14px !important;
            }

            .rating-badge {
              padding: 6px 12px !important;
            }

            .rating-text {
              font-size: 14px !important;
            }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </>
  )
}

export default NetflixShowPage
