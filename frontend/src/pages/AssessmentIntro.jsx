import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import "../App.css";

import {
  getMyAssessment,
  startAttempt,
} from "../api/assessments";


const ATTEMPT_STORAGE_KEY =
  "neuromatrix_assessment_attempt";

const ANSWERS_STORAGE_KEY =
  "neuromatrix_assessment_answers";


function AssessmentIntro() {
  const navigate = useNavigate();

  const [assessment, setAssessment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [starting, setStarting] =
    useState(false);


  /*
   * ================================
   * LOAD ASSIGNED ASSESSMENT
   * ================================
   */

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setError("");

        const data = await getMyAssessment();

        setAssessment(data);

      } catch (err) {
        console.error(
          "Failed to load assigned assessment:",
          err
        );

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.detail ||
          "Unable to load your assigned assessment."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [navigate]);


  /*
   * ================================
   * LOADING STATE
   * ================================
   */

  if (loading) {
    return (
      <div className="assessment-intro-page">
        <main className="assessment-intro-main">
          <p>Loading your assessment...</p>
        </main>
      </div>
    );
  }


  /*
   * ================================
   * ERROR STATE
   * ================================
   */

  if (error || !assessment) {
    return (
      <div className="assessment-intro-page">
        <main className="assessment-intro-main">

          <p>
            {error ||
              "Assessment information unavailable."}
          </p>

          <Link
            to="/dashboard"
            className="assessment-begin-button"
          >
            Back to Dashboard
          </Link>

        </main>
      </div>
    );
  }


  /*
   * ================================
   * BEGIN ASSESSMENT
   * ================================
   */

  const handleBeginAssessment = async () => {
    try {
      setError("");
      setStarting(true);

      /*
       * Always start a fresh attempt.
       */

      localStorage.removeItem(
        ATTEMPT_STORAGE_KEY
      );

      localStorage.removeItem(
        ANSWERS_STORAGE_KEY
      );

      const sessionId = crypto.randomUUID();

      /*
       * IMPORTANT:
       *
       * We use the assessment slug returned
       * by Django.
       *
       * React does NOT decide which assessment
       * the student receives.
       */

      const attempt = await startAttempt(
        assessment.slug,
        sessionId
      );

      localStorage.setItem(
        ATTEMPT_STORAGE_KEY,
        String(attempt.id)
      );

      navigate("/assessment/questions");

    } catch (err) {
      console.error(
        "Failed to start assessment:",
        err
      );

      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Unable to start the assessment. Please try again."
      );
    } finally {
      setStarting(false);
    }
  };


  /*
   * ================================
   * CURRENT ASSESSMENT INFORMATION
   * ================================
   */

  /*
   * The current /my-assessment/ endpoint
   * returns assessment metadata only.
   *
   * Therefore we don't assume questions,
   * sections or options exist in this response.
   *
   * The actual assessment content will be
   * loaded by the assessment questions page.
   */

  return (
    <div className="assessment-intro-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <Link
          to="/"
          className="dashboard-brand"
        >
          <span>
            NeuroMatrix
          </span>{" "}
          Pathways
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


      {/* ================= MAIN ================= */}

      <main className="assessment-intro-main">

        {/* ================= HEADER ================= */}

        <div className="assessment-intro-header">

          <p className="dashboard-eyebrow">
            NEUROMATRIX ASSESSMENT
          </p>

          <h1>
            A little time to
            <span>
              {" "}understand yourself.
            </span>
          </h1>

          <h2>
            {assessment.name}
          </h2>

          <p>
            {assessment.description ||
              "This assessment is designed to help you reflect on yourself, your preferences and the way you approach different situations."}
          </p>

        </div>


        {/* ================= ASSESSMENT INFORMATION ================= */}

        <div className="assessment-info-grid">

          {/* Assessment */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◈
            </span>

            <div>

              <small>
                ASSESSMENT
              </small>

              <strong>
                {assessment.name}
              </strong>

            </div>

          </div>


          {/* Student Standard */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◌
            </span>

            <div>

              <small>
                ASSIGNED FOR
              </small>

              <strong>
                {assessment.student_status ||
                  "Your student category"}
              </strong>

            </div>

          </div>


          {/* Version */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◷
            </span>

            <div>

              <small>
                VERSION
              </small>

              <strong>
                {assessment.version ||
                  "Current"}
              </strong>

            </div>

          </div>

        </div>


        {/* ================= INSTRUCTIONS ================= */}

        <section className="assessment-instructions">

          <div>

            <p className="dashboard-eyebrow">
              BEFORE YOU BEGIN
            </p>

            <h2>
              Answer honestly, not perfectly.
            </h2>

            <p>
              There are no right or wrong
              answers. Choose the response
              that best represents how you
              generally think, feel or behave.
            </p>

          </div>


          <div className="instruction-list">

            <div className="instruction-item">

              <span>
                01
              </span>

              <p>
                Read each statement carefully.
              </p>

            </div>


            <div className="instruction-item">

              <span>
                02
              </span>

              <p>
                Choose the response that feels
                most accurate.
              </p>

            </div>


            <div className="instruction-item">

              <span>
                03
              </span>

              <p>
                Don't spend too much time on
                any one question.
              </p>

            </div>

          </div>

        </section>


        {/* ================= RESPONSE SCALE ================= */}

        <section className="scale-section">

          <p className="dashboard-eyebrow">
            ASSESSMENT FORMAT
          </p>

          <h2>
            What to expect
          </h2>

          <div className="scale-preview">

            <div className="scale-item">

              <span className="scale-circle">
                ✓
              </span>

              <span>
                Answer every required question
              </span>

            </div>

            <div className="scale-item">

              <span className="scale-circle">
                ✓
              </span>

              <span>
                Your responses are saved securely
              </span>

            </div>

            <div className="scale-item">

              <span className="scale-circle">
                ✓
              </span>

              <span>
                Results are reviewed professionally
              </span>

            </div>

          </div>

        </section>


        {/* ================= BEGIN ================= */}

        <div className="assessment-begin">

          <p>
            Make sure you have a quiet few
            minutes before beginning.
          </p>

          {error && (
            <p className="assessment-error">
              {error}
            </p>
          )}

          <button
            type="button"
            className="assessment-begin-button"
            onClick={handleBeginAssessment}
            disabled={starting}
          >
            {starting
              ? "Starting..."
              : "Begin Assessment"}

            {!starting && (
              <span>
                →
              </span>
            )}

          </button>

        </div>

      </main>

    </div>
  );
}


export default AssessmentIntro;