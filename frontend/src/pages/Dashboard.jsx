import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
  // Temporary user data.
  // Later this will come from the logged-in user's profile.
  const user = {
    name: "Aditya",
    status: "10th",
    assessmentCompleted: false,
  };

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-brand">
          <span>NeuroMatrix</span> Pathways
        </Link>

        <div className="dashboard-nav">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <button className="logout-button">
            Logout
          </button>

        </div>

      </nav>


      {/* ================= DASHBOARD ================= */}

      <main className="dashboard-main">

        {/* Welcome */}

        <section className="dashboard-welcome">

          <div>

            <p className="dashboard-eyebrow">
              YOUR NEUROMATRIX JOURNEY
            </p>

            <h1>
              Welcome back, {user.name}.
            </h1>

            <p>
              This is your personal space to explore
              yourself and your future.
            </p>

          </div>

          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

        </section>


        {/* Status */}

        <section className="status-banner">

          <div className="status-banner-icon">
            ✓
          </div>

          <div>

            <span>
              CURRENT STUDENT STATUS
            </span>

            <strong>
              {user.status} Standard
            </strong>

          </div>

          <Link to="/profile">
            View Profile →
          </Link>

        </section>


        {/* Main assessment card */}

        <section className="assessment-dashboard-card">

          <div className="assessment-card-content">

            <p className="dashboard-eyebrow">
              YOUR ASSESSMENT
            </p>

            <h2>
              Discover more about yourself.
            </h2>

            <p>
              Your assessment is designed according to
              your current stage of education. Take your
              time and answer each statement honestly.
            </p>

            <div className="assessment-meta">

              <div>
                <span>Questions</span>
                <strong>—</strong>
              </div>

              <div>
                <span>Response</span>
                <strong>5 Point Scale</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {user.assessmentCompleted
                    ? "Completed"
                    : "Not Started"}
                </strong>
              </div>

            </div>

            <Link
              to="/assessment"
              className="dashboard-start-button"
            >
              Start Assessment
              <span>→</span>
            </Link>

          </div>


          {/* Visual */}

          <div className="dashboard-card-visual">

            <div className="dashboard-orbit orbit-a"></div>
            <div className="dashboard-orbit orbit-b"></div>

            <div className="dashboard-center">
              <span>NM</span>
            </div>

          </div>

        </section>


        {/* Bottom cards */}

        <section className="dashboard-bottom-grid">

          <Link
            to="/profile"
            className="dashboard-small-card"
          >

            <div className="small-card-icon">
              ◉
            </div>

            <div>
              <h3>
                My Profile
              </h3>

              <p>
                View and manage your personal information.
              </p>
            </div>

            <span className="small-card-arrow">
              →
            </span>

          </Link>


          <div className="dashboard-small-card disabled-card">

            <div className="small-card-icon">
              ◌
            </div>

            <div>
              <h3>
                My Report
              </h3>

              <p>
                Your personalized report will appear here
                after completing your assessment.
              </p>
            </div>

            <span className="small-card-arrow">
              —
            </span>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;