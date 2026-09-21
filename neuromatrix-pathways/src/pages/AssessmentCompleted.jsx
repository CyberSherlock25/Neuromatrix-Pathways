import { Link } from "react-router-dom";
import "../App.css";

function AssessmentCompleted() {
  return (
    <div className="assessment-completed-page">

      {/* Navbar */}

      <nav className="completed-navbar">

        <Link to="/" className="completed-brand">
          <span>NeuroMatrix</span> Pathways
        </Link>

        <Link
          to="/dashboard"
          className="completed-dashboard-link"
        >
          Dashboard
        </Link>

      </nav>


      {/* Main */}

      <main className="completed-main">

        <div className="completed-card">

          {/* Success icon */}

          <div className="completed-icon">
            <span>✓</span>
          </div>


          {/* Label */}

          <p className="completed-label">
            ASSESSMENT COMPLETE
          </p>


          {/* Heading */}

          <h1>
            You've completed your
            <span> assessment.</span>
          </h1>


          <p className="completed-description">
            Thank you for taking the time to complete your
            NeuroMatrix assessment. Your responses have
            been recorded successfully.
          </p>


          {/* Information */}

          <div className="completed-summary">

            <div className="completed-summary-item">

              <span>
                QUESTIONS
              </span>

              <strong>
                50
              </strong>

            </div>


            <div className="completed-summary-divider" />


            <div className="completed-summary-item">

              <span>
                STATUS
              </span>

              <strong>
                Completed
              </strong>

            </div>


            <div className="completed-summary-divider" />


            <div className="completed-summary-item">

              <span>
                RESULTS
              </span>

              <strong>
                Coming soon
              </strong>

            </div>

          </div>


          {/* Notice */}

          <div className="completed-notice">

            <div className="completed-notice-icon">
              i
            </div>

            <p>
              Your assessment responses have been saved.
              Your personalized insights will become
              available once the NeuroMatrix analysis
              engine is enabled.
            </p>

          </div>


          {/* Actions */}

          <div className="completed-actions">

            <Link
              to="/dashboard"
              className="completed-primary-button"
            >
              Go to Dashboard
              <span>→</span>
            </Link>

            <Link
              to="/profile"
              className="completed-secondary-button"
            >
              View Profile
            </Link>

          </div>

        </div>


        {/* Footer */}

        <p className="completed-footer">
          NeuroMatrix Pathways · Your journey of
          self-discovery starts here.
        </p>

      </main>

    </div>
  );
}

export default AssessmentCompleted;