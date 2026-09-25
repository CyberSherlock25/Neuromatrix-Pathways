import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import { useAuth } from "../context/AuthContext";
import { getAdminDashboardStats } from "../api/assessments";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
  active_assessments: 0,
  total_questions: 0,
  dimensions: 0,
  reports: 0,
  });

  useEffect(() => {
  const loadStats = async () => {
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(
        "Failed to load admin dashboard statistics:",
        error
      );
    } finally {
      setStatsLoading(false);
    }
  };

  loadStats();
  }, []);

  const [statsLoading, setStatsLoading] = useState(true);

  const displayName =
    user?.first_name ||
    user?.username ||
    "Admin";

  const avatarInitials =
    `${user?.first_name?.[0] || user?.username?.[0] || "A"}${
      user?.last_name?.[0] || ""
    }`.toUpperCase();

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
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

        <nav className="admin-nav">
          <div className="admin-nav-label">
            Workspace
          </div>

          <button
            className="admin-nav-item active"
          >
            <span className="admin-nav-icon">
              ▦
            </span>
            Dashboard
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin/assessments")
            }
          >
            <span className="admin-nav-icon">
              ◈
            </span>
            Assessments
          </button>

          <button className="admin-nav-item"
          onClick={()=>
            navigate("/admin/questions")
          }>
            <span className="admin-nav-icon">
              ☷
            </span>
            Question Bank
          </button>

          <button className="admin-nav-item"
          onClick={()=>
            navigate("/admin/dimensions")
          }>
            <span className="admin-nav-icon">
              ◉
            </span>
            Dimensions
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ⚙
            </span>
            Scoring
          </button>

          <div
            className="admin-nav-label"
            style={{ marginTop: "25px" }}
          >
            Operations
          </div>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ♙
            </span>
            Psychologists
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ◫
            </span>
            Reports
          </button>
        </nav>

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

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div>
            <div className="admin-page-heading">
              Dashboard
            </div>

            <div className="admin-breadcrumb">
              Neuromatrix / Admin
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-status">
              <span className="admin-status-dot" />
              System Online
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="admin-content">
          <div className="admin-title-row">
            <div>
              <h1 className="admin-title">
                Good afternoon, {displayName}
              </h1>

              <p className="admin-description">
                Manage the Neuromatrix assessment platform.
              </p>
            </div>

            <button
              className="admin-primary-button"
              onClick={() =>
                navigate("/admin/assessments")
              }
            >
              Manage Assessments
            </button>
          </div>

          {/* STATS */}
          <div className="admin-stat-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-label">
                Active Assessments
              </div>

              <div className="admin-stat-value">
                {statsLoading ?  "Loading..." : stats.active_assessments}
              </div>

              <div className="admin-stat-meta">
                Currently published
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-label">
                Question Bank
              </div>

              <div className="admin-stat-value">
                {statsLoading ?  "Loading..." : stats.total_questions}
              </div>

              <div className="admin-stat-meta">
                Active questions
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-label">
                Dimensions
              </div>

              <div className="admin-stat-value">
              {statsLoading ?  "Loading..." : stats.dimensions}
              </div>

              <div className="admin-stat-meta">
                Personality dimensions
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-label">
                Reports
              </div>

              <div className="admin-stat-value">
                {statsLoading ? "—" : stats.reports}
              </div>

              <div className="admin-stat-meta">
                Report analytics
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <div className="admin-panel-title">
                  Quick Actions
                </div>

                <div className="admin-panel-subtitle">
                  Manage your assessment system
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              <button
                className="admin-action"
                style={{
                  height: "70px",
                  textAlign: "left",
                }}
                onClick={() =>
                  navigate("/admin/assessments")
                }
              >
                <strong>
                  Assessment Manager
                </strong>

                <br />

                <span
                  style={{
                    color: "#71717a",
                    fontSize: "10px",
                  }}
                >
                  Create and configure assessments
                </span>
              </button>

              <button
                className="admin-action"
                style={{
                  height: "70px",
                  textAlign: "left",
                }}
                onClick={() =>
                  navigate("/admin/questions")
                }
              >
                <strong>
                  Question Bank
                </strong>

                <br />

                <span
                  style={{
                    color: "#71717a",
                    fontSize: "10px",
                  }}
                >
                  Manage assessment questions
                </span>
              </button>

              <button
                className="admin-action"
                style={{
                  height: "70px",
                  textAlign: "left",
                }}
              >
                <strong>
                  Scoring Engine
                </strong>

                <br />

                <span
                  style={{
                    color: "#71717a",
                    fontSize: "10px",
                  }}
                >
                  Configure scoring rules
                </span>
              </button>

              <button
                className="admin-action"
                style={{
                  height: "70px",
                  textAlign: "left",
                }}
              >
                <strong>
                  Review Queue
                </strong>

                <br />

                <span
                  style={{
                    color: "#71717a",
                    fontSize: "10px",
                  }}
                >
                  Psychologist assessments
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;