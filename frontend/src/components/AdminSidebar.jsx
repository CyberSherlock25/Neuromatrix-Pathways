import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const displayName =
    user?.first_name ||
    user?.username ||
    "Admin";

  const avatarInitials =
    `${user?.first_name?.[0] || user?.username?.[0] || "A"}${
      user?.last_name?.[0] || ""
    }`.toUpperCase();

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      {/* BRAND */}

      <div className="admin-brand">

        <div className="admin-brand-logo">
          N
        </div>

        <div>
          <div className="admin-brand-text">
            Neuromatrix
          </div>

          <span className="admin-brand-subtitle">
            ADMIN CONSOLE
          </span>
        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="admin-nav">

        <div className="admin-nav-label">
          Workspace
        </div>


        {/* Dashboard */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/admin")
          }
        >
          <span className="admin-nav-icon">
            ▦
          </span>

          Dashboard
        </button>


        {/* Assessments */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin/assessments")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/admin/assessments")
          }
        >
          <span className="admin-nav-icon">
            ◈
          </span>

          Assessments
        </button>


        {/* Question Bank */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin/questions")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/admin/questions")
          }
        >
          <span className="admin-nav-icon">
            ☷
          </span>

          Question Bank
        </button>


        {/* Dimensions */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin/dimensions")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/admin/dimensions")
          }
        >
          <span className="admin-nav-icon">
            ◉
          </span>

          Dimensions
        </button>


        {/* Mappings */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin/mappings")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/admin/mappings")
          }
        >
          <span className="admin-nav-icon">
            ⛓
          </span>

          Mappings
        </button>


        {/* Scoring */}

        <button
          type="button"
          className={`admin-nav-item ${
            isActive("/admin/scoring")
              ? "active"
              : ""
          }`}
        >
          <span className="admin-nav-icon">
            ⚙
          </span>

          Scoring
        </button>


        {/* OPERATIONS */}

        <div
          className="admin-nav-label"
          style={{
            marginTop: "25px",
          }}
        >
          Operations
        </div>


        <button
          type="button"
          className="admin-nav-item"
        >
          <span className="admin-nav-icon">
            ♙
          </span>

          Psychologists
        </button>


        <button
          type="button"
          className="admin-nav-item"
        >
          <span className="admin-nav-icon">
            ◫
          </span>

          Reports
        </button>


        {/* ACCOUNT */}

        <div
          className="admin-nav-label"
          style={{
            marginTop: "25px",
          }}
        >
          Account
        </div>


        <button
          type="button"
          className="admin-nav-item"
          onClick={handleLogout}
        >
          <span className="admin-nav-icon">
            ↪
          </span>

          Logout
        </button>

      </nav>


      {/* USER */}

      <div className="admin-sidebar-bottom">

        <div className="admin-user-mini">

          <div className="admin-avatar">
            {avatarInitials}
          </div>

          <div>

            <div className="admin-user-name">
              {displayName}
            </div>

            <div className="admin-user-role">
              System Admin
            </div>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default AdminSidebar;