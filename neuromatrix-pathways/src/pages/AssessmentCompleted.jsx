import { Link } from "react-router-dom";
import "../App.css";

function AssessmentCompleted() {
  return (
    <div className="completion-page">

      <div className="completion-card">

        <div className="completion-icon">
          ✓
        </div>

        <p className="eyebrow">
          ASSESSMENT COMPLETE
        </p>

        <h1>
          You've completed your assessment.
        </h1>

        <p>
          Thank you for taking the time to complete
          your NeuroMatrix Pathways assessment.
        </p>

        <Link
          to="/report"
          className="primary-btn"
        >
          View My Report
        </Link>

        <Link
          to="/dashboard"
          className="back-link"
        >
          Return to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default AssessmentCompleted;