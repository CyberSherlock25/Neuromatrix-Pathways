import { Link } from "react-router-dom";
import "../App.css";

function Report() {
  return (
    <div className="report-page">

      <nav className="dashboard-navbar">

        <Link to="/" className="logo">
          NeuroMatrix <span>Pathways</span>
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </nav>

      <main className="report-content">

        <p className="eyebrow">
          YOUR NEUROMATRIX REPORT
        </p>

        <h1>
          Your assessment report
        </h1>

        <p>
          Your personalized results will appear here once
          the validated assessment framework and scoring
          methodology are implemented.
        </p>

        <div className="report-placeholder">

          <h2>
            Report Coming Next
          </h2>

          <p>
            We are currently building the assessment
            methodology using validated and appropriately
            licensed psychological instruments.
          </p>

        </div>

        <Link
          to="/dashboard"
          className="primary-btn"
        >
          Back to Dashboard
        </Link>

      </main>

    </div>
  );
}

export default Report;