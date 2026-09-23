import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import "../App.css";

import api from "../api/client";
import { startAttempt } from "../api/assessments";


const ASSESSMENT_SLUG =
  "neuromatrix-personality";
const ATTEMPT_STORAGE_KEY = "neuromatrix_assessment_attempt";
const ANSWERS_STORAGE_KEY = "neuromatrix_assessment_answers";


function AssessmentIntro() {
  const navigate = useNavigate();

  const [assessment, setAssessment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const response = await api.get(
          `/assessments/${ASSESSMENT_SLUG}/`
        );

        setAssessment(response.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          "Unable to load assessment information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [navigate]);


  if (loading) {
    return (
      <div className="assessment-intro-page">
        <main className="assessment-intro-main">
          <p>Loading assessment...</p>
        </main>
      </div>
    );
  }


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
   * ASSESSMENT DATA
   * ================================
   */

  const sections =
    assessment.sections || [];


  const questions = sections.flatMap(
    (section) =>
      section.questions || []
  );


  const questionCount =
    questions.length;


  const firstQuestion =
    questions[0];


  const options =
    firstQuestion?.options || [];


  /*
   * ================================
   * RESPONSE SCALE
   * ================================
   */

  const responseScale =
    options.map((option) => ({
      value: option.value,
      text: option.text,
      order: option.order,
    }));


  /*
   * ================================
   * BEGIN ASSESSMENT
   * ================================
   */

  const handleBeginAssessment = async () => {
  try {
    setError("");

    // Always start a fresh attempt
    localStorage.removeItem(ATTEMPT_STORAGE_KEY);
    localStorage.removeItem(ANSWERS_STORAGE_KEY);

    const sessionId = crypto.randomUUID();

    const attempt = await startAttempt(
      ASSESSMENT_SLUG,
      sessionId
    );

    // Store the NEW attempt ID
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
      "Unable to start the assessment. Please try again."
    );
  }
};


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

        {/* Header */}

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


          <p>
            {assessment.description ||
              "This assessment is designed to help you reflect on yourself, your preferences and the way you approach different situations."}
          </p>

        </div>


        {/* ================= ASSESSMENT INFORMATION ================= */}

        <div className="assessment-info-grid">

          {/* Questions */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◌
            </span>

            <div>

              <small>
                QUESTIONS
              </small>

              <strong>
                {questionCount}
              </strong>

            </div>

          </div>


          {/* Estimated Time */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◷
            </span>

            <div>

              <small>
                ESTIMATED TIME
              </small>

              <strong>
                Not specified
              </strong>

            </div>

          </div>


          {/* Response Format */}

          <div className="assessment-info-card">

            <span className="info-icon">
              ◉
            </span>

            <div>

              <small>
                RESPONSE FORMAT
              </small>

              <strong>
                {responseScale.length
                  ? `${responseScale.length}-point scale`
                  : "Not specified"}
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
            RESPONSE SCALE
          </p>


          <h2>
            How you'll answer
          </h2>


          <div className="scale-preview">

            {responseScale.map(
              (option) => (

                <div
                  className="scale-item"
                  key={option.order}
                >

                  <span className="scale-circle">
                    {option.value}
                  </span>

                  <span>
                    {option.text}
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* ================= BEGIN ================= */}

        <div className="assessment-begin">

          <p>
            Make sure you have a quiet few
            minutes before beginning.
          </p>


          <button
            type="button"
            className="assessment-begin-button"
            onClick={handleBeginAssessment}
          >
            Begin Assessment

            <span>
              →
            </span>

          </button>

        </div>

      </main>

    </div>
  );
}


export default AssessmentIntro;