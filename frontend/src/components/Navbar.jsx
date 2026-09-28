import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-navbar">

      <div className="site-navbar-inner">

        {/* ================= LOGO ================= */}

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


        {/* ================= DESKTOP NAV ================= */}

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


          {/* ================= MOBILE ACTIONS ================= */}

          <div className="site-mobile-actions">

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

          </div>

        </nav>


        {/* ================= DESKTOP ACTIONS ================= */}

        <div className="site-desktop-actions">

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

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          type="button"
          className={`site-menu-toggle ${
            menuOpen ? "is-open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
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