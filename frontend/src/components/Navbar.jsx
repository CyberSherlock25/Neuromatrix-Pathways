import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <Link to="/" className="brand">
        <span className="brand-main">
          NeuroMatrix
        </span>

        <span className="brand-sub">
          Pathways
        </span>
      </Link>


      {/* ================= NAVIGATION ================= */}

      <div className="nav-links">

        {/* HOME */}

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>


        {/* ABOUT */}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>


        {/* WHY COUNSELLING */}

        <NavLink
          to="/why-counselling"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Why Counselling
        </NavLink>


        {/* INSIGHTS */}

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Insights
        </NavLink>


        {/* SERVICES */}

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Services
        </NavLink>


        {/* CONTACT */}

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact
        </NavLink>


        {/* ================= LOGIN ================= */}

        <Link
          to="/login"
          className="nav-login"
        >
          Login
        </Link>


        {/* ================= CTA ================= */}

        <Link
          to="/signup"
          className="nav-get-started"
        >
          Start Assessment →
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;