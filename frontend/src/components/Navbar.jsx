import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  const getInitials = () => {
    if (!user) {
      return "U";
    }

    const firstName =
      user.first_name ||
      user.firstName ||
      "";

    const lastName =
      user.last_name ||
      user.lastName ||
      "";

    if (firstName || lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase();
    }

    return (
      user.username ||
      user.email ||
      "U"
    )
      .charAt(0)
      .toUpperCase();
  };

  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">

        {/* BRAND */}

        <Link
          to="/"
          className="site-brand"
          onClick={closeMenu}
        >
          <span className="site-brand-main">
            NeuroMatrix
          </span>

          <span className="site-brand-sub">
            Pathways
          </span>
        </Link>


        {/* NAVIGATION */}

        <nav
          className={`site-navigation ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/why-counselling"
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            Why Counselling
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            Insights
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `site-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>


          {/* MOBILE ACTIONS */}

          <div className="site-mobile-actions">

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="site-login-button"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="site-cta-button"
                  onClick={closeMenu}
                >
                  Start Assessment
                  <span>→</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="site-login-button"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <Link
                  to="/assessment/questions"
                  className="site-cta-button"
                  onClick={closeMenu}
                >
                  Start Assessment
                  <span>→</span>
                </Link>

                <Link
                  to="/profile"
                  className="site-login-button"
                  onClick={closeMenu}
                >
                  Profile
                </Link>

                <button
                  type="button"
                  className="site-login-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </nav>


        {/* DESKTOP ACTIONS */}

        <div className="site-desktop-actions">

          {!isAuthenticated ? (
            <>
              {/* ORIGINAL LOGGED-OUT NAVBAR */}

              <Link
                to="/login"
                className="site-login-button"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="site-cta-button"
              >
                Start Assessment
                <span>→</span>
              </Link>
            </>
          ) : (
            <>
              {/* DASHBOARD BUTTON */}

              <Link
                to="/dashboard"
                className="site-login-button"
              >
                Dashboard
              </Link>


              {/* START ASSESSMENT */}

              <Link
                to="/assessment/questions"
                className="site-cta-button"
              >
                Start Assessment
                <span>→</span>
              </Link>


              {/* PROFILE ICON */}

              <div
                className="site-profile-wrapper"
              >
                <button
                  type="button"
                  className="site-profile-icon"
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                >
                  {getInitials()}
                </button>


                {profileOpen && (
                  <div className="site-profile-dropdown">

                    <div className="site-profile-header">

                      <div className="site-profile-avatar">
                        {getInitials()}
                      </div>

                      <div>
                        <strong>
                          {user?.first_name ||
                            user?.username ||
                            "Student"}
                        </strong>

                        {user?.email && (
                          <span>
                            {user.email}
                          </span>
                        )}
                      </div>

                    </div>


                    <div className="site-profile-divider" />


                    <Link
                      to="/dashboard"
                      className="site-profile-item"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      className="site-profile-item"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/assessment/questions"
                      className="site-profile-item"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      Assessment
                    </Link>


                    <div className="site-profile-divider" />


                    <button
                      type="button"
                      className="site-profile-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </>
          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className={`site-menu-toggle ${
            menuOpen ? "is-open" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}

export default Navbar;