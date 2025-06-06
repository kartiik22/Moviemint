import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch user info when token exists
  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setUserInfo(null);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://net-1-fxsl.onrender.com/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error("Failed to fetch user info");
        if (response.status === 401) {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Google Fonts Import */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap" 
        rel="stylesheet" 
      />
      
      <nav style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #141414 100%)",
        padding: isMobile ? "12px 16px" : "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        minHeight: isMobile ? "60px" : "70px"
      }}>
        {/* Left Section - Logo and Home */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "20px" : "40px",
          flexShrink: 0
        }}>
          {/* Logo */}
          <Link to="/" style={{
            background: "linear-gradient(45deg, #e50914, #ff6b6b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: isMobile ? "20px" : "32px",
            fontWeight: "800",
            textDecoration: "none",
            letterSpacing: isMobile ? "1px" : "2px",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 0 30px rgba(229, 9, 20, 0.5)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.filter = "drop-shadow(0 0 20px rgba(229, 9, 20, 0.8))";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = "scale(1)";
              e.target.style.filter = "none";
            }
          }}
          >
            MOVIEMINT
          </Link>

          {/* Home Link - Shows on both desktop and mobile */}
          <Link to="/" style={{
            color: "#ffffff",
            textDecoration: "none",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            padding: "8px 0"
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#e50914";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.textShadow = "0 4px 8px rgba(229, 9, 20, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#ffffff";
            e.target.style.transform = "translateY(0)";
            e.target.style.textShadow = "none";
          }}
          >
            Home
          </Link>
        </div>

        {/* Desktop Auth Section */}
        {!isMobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexShrink: 0
          }}>
            {!token ? (
              <>
                <Link to="/login" style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "10px 20px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
                >
                  Login
                </Link>
                <Link to="/signup" style={{
                  background: "linear-gradient(135deg, #e50914, #ff1744)",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "10px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #ff1744, #e50914)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(229, 9, 20, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #e50914, #ff1744)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(229, 9, 20, 0.4)";
                }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}>
                {/* Loading Spinner */}
                {loading && (
                  <div style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid rgba(229, 9, 20, 0.3)",
                    borderRadius: "50%",
                    borderTopColor: "#e50914",
                    animation: "spin 1s linear infinite"
                  }}>
                    <style>
                      {`
                        @keyframes spin {
                          to { transform: rotate(360deg); }
                        }
                      `}
                    </style>
                  </div>
                )}

                {/* Subscription Status */}
                {!loading && userInfo && (
                  userInfo.ispaid ? (
                    <div style={{
                      background: "linear-gradient(135deg, #28a745, #20c997)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: "600",
                      fontFamily: "'Inter', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)",
                      whiteSpace: "nowrap"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 12l2 2 4-4"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      Subscribed
                    </div>
                  ) : (
                    <Link to="/buy" style={{
                      background: "linear-gradient(135deg, #e50914, #ff6b6b)",
                      color: "white",
                      textDecoration: "none",
                      padding: "10px 20px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily: "'Inter', sans-serif",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
                      whiteSpace: "nowrap"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #ff1744, #ff6b6b)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 30px rgba(229, 9, 20, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #e50914, #ff6b6b)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(229, 9, 20, 0.4)";
                    }}
                    >
                      Subscribe
                    </Link>
                  )
                )}

                {/* User Avatar */}
                {userInfo && (
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "'Inter', sans-serif",
                    flexShrink: 0
                  }}>
                    {(userInfo.name || userInfo.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Logout Button */}
                <button 
                  onClick={() => dispatch(logout())}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#e0e0e0",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "8px 16px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backdropFilter: "blur(10px)",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 59, 48, 0.1)";
                    e.target.style.color = "#ff3b30";
                    e.target.style.borderColor = "rgba(255, 59, 48, 0.3)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.color = "#e0e0e0";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button - Only show hamburger menu if user is logged in */}
        {isMobile && token && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            {/* Mobile Quick Subscription Status */}
            {!loading && userInfo && (
              userInfo.ispaid ? (
                <div style={{
                  background: "linear-gradient(135deg, #28a745, #20c997)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Pro
                </div>
              ) : (
                <Link to="/buy" style={{
                  background: "linear-gradient(135deg, #e50914, #ff6b6b)",
                  color: "white",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Subscribe
                </Link>
              )
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "36px",
                height: "36px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
            >
              <div style={{
                width: "18px",
                height: "2px",
                backgroundColor: "#fff",
                margin: "2px 0",
                transition: "0.3s",
                transform: isMobileMenuOpen ? "rotate(-45deg) translate(-4px, 4px)" : "none"
              }}></div>
              <div style={{
                width: "18px",
                height: "2px",
                backgroundColor: "#fff",
                margin: "2px 0",
                transition: "0.3s",
                opacity: isMobileMenuOpen ? "0" : "1"
              }}></div>
              <div style={{
                width: "18px",
                height: "2px",
                backgroundColor: "#fff",
                margin: "2px 0",
                transition: "0.3s",
                transform: isMobileMenuOpen ? "rotate(45deg) translate(-4px, -4px)" : "none"
              }}></div>
            </button>
          </div>
        )}

        {/* Mobile Auth Buttons - Show only when not logged in */}
        {isMobile && !token && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Link to="/login" style={{
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: "rgba(255, 255, 255, 0.05)",
              whiteSpace: "nowrap"
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: "linear-gradient(135deg, #e50914, #ff1744)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap"
            }}>
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay - Only show when logged in */}
      {isMobile && isMobileMenuOpen && token && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.9)",
          zIndex: 999,
          backdropFilter: "blur(10px)"
        }}
        onClick={closeMobileMenu}
        >
          {/* Mobile Menu Content */}
          <div style={{
            position: "absolute",
            top: "70px",
            left: "16px",
            right: "16px",
            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation: "slideDown 0.3s ease-out",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
                @keyframes slideDown {
                  from { 
                    opacity: 0;
                    transform: translateY(-20px);
                  }
                  to { 
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}
            </style>

            {/* Mobile User Info */}
            {userInfo && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                marginBottom: "16px"
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {(userInfo.name || userInfo.email || "U").charAt(0).toUpperCase()}
                </div>
                <span style={{
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "'Inter', sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1
                }}>
                  {userInfo.name || userInfo.email || "User"}
                </span>
              </div>
            )}

            {/* Mobile Subscription Status */}
            {!loading && userInfo && !userInfo.ispaid && (
              <Link 
                to="/buy" 
                onClick={closeMobileMenu}
                style={{
                  background: "linear-gradient(135deg, #e50914, #ff6b6b)",
                  color: "white",
                  textDecoration: "none",
                  padding: "12px 16px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
                  display: "block",
                  marginBottom: "16px"
                }}
              >
                Subscribe Now
              </Link>
            )}

            {/* Mobile Logout Button */}
            <button 
              onClick={() => {
                dispatch(logout());
                closeMobileMenu();
              }}
              style={{
                background: "rgba(255, 59, 48, 0.1)",
                color: "#ff3b30",
                border: "1px solid rgba(255, 59, 48, 0.3)",
                padding: "12px 16px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.3s ease",
                width: "100%"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
