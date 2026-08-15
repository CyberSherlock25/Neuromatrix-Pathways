import { Link } from "react-router-dom";
import "../App.css";

function AssessmentIntro() {
  return (
    <div className="assessment-intro-page">

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
        </div>

      </nav>


      <main className="assessment-intro-main">

        <div className="assessment-intro-header">

          <p className="dashboard-eyebrow">
            NEUROMATRIX ASSESSMENT
          </p>

          <h1>
            A little time to
            <span> understand yourself.</span>
          </h1>

          <p>
            This assessment is designed to help you reflect
            on yourself, your preferences and the way you
            approach different situations.
          </p>

        </div>


        {/* Assessment information */}

        <div className="assessment-info-grid">

          <div className="assessment-info-card">

            <span className="info-icon">
              ◌
            </span>

            <div>
              <small>QUESTIONS</small>
              <strong>30</strong>
            </div>

          </div>


          <div className="assessment-info-card">

            <span className="info-icon">
              ◷
            </span>

            <div>
              <small>ESTIMATED TIME</small>
              <strong>10–15 min</strong>
            </div>

          </div>


          <div className="assessment-info-card">

            <span className="info-icon">
              ◉
            </span>

            <div>
              <small>RESPONSE FORMAT</small>
              <strong>5-point scale</strong>
            </div>

          </div>

        </div>


        {/* Instructions */}

        <section className="assessment-instructions">

          <div>

            <p className="dashboard-eyebrow">
              BEFORE YOU BEGIN
            </p>

            <h2>
              Answer honestly, not perfectly.
            </h2>

            <p>
              There are no right or wrong answers. Choose
              the response that best represents how you
              generally think, feel or behave.
            </p>

          </div>


          <div className="instruction-list">

            <div className="instruction-item">
              <span>01</span>
              <p>
                Read each statement carefully.
              </p>
            </div>

            <div className="instruction-item">
              <span>02</span>
              <p>
                Choose the response that feels most accurate.
              </p>
            </div>

            <div className="instruction-item">
              <span>03</span>
              <p>
                Don't spend too much time on any one question.
              </p>
            </div>

          </div>

        </section>


        {/* Response scale */}

        <section className="scale-section">

          <p className="dashboard-eyebrow">
            RESPONSE SCALE
          </p>

          <h2>
            How you'll answer
          </h2>

          <div className="scale-preview">

            <div className="scale-item">
              <span className="scale-circle">1</span>
              <span>Strongly Agree</span>
            </div>

            <div className="scale-item">
              <span className="scale-circle">2</span>
              <span>Agree</span>
            </div>

            <div className="scale-item">
              <span className="scale-circle">3</span>
              <span>Neutral</span>
            </div>

            <div className="scale-item">
              <span className="scale-circle">4</span>
              <span>Disagree</span>
            </div>

            <div className="scale-item">
              <span className="scale-circle">5</span>
              <span>Strongly Disagree</span>
            </div>

          </div>

        </section>


        {/* Begin */}

        <div className="assessment-begin">

          <p>
            Make sure you have a quiet few minutes
            before beginning.
          </p>

          <Link
            to="/assessment/questions"
            className="assessment-begin-button"
          >
            Begin Assessment
            <span>→</span>
          </Link>

        </div>

      </main>

    </div>
  );
}

export default AssessmentIntro;