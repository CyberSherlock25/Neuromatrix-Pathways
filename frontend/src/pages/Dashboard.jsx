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

import { useAuth } from "../context/AuthContext";


const ASSESSMENT_SLUG =
  "neuromatrix-personality";


const STATUS_LABELS = {
  "8th": "8th Standard",
  "9th": "9th Standard",
  "10th": "10th Standard",
  "11th": "11th Standard",
  "12th": "12th Standard",
  "pursuing-ug": "Pursuing UG",
  "completed-ug": "Completed UG",
};


function Dashboard() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();


  const [
    assessment,
    setAssessment,
  ] = useState(null);


  const [
    assessmentLoading,
    setAssessmentLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadAssessment = async () => {

      try {

        const response = await api.get(
          `/assessments/${ASSESSMENT_SLUG}/`
        );

        setAssessment(
          response.data
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load assessment information."
        );

      } finally {

        setAssessmentLoading(false);

      }
    };


    loadAssessment();

  }, []);


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  if (!user) {
    return null;
  }


  const fullName = [
    user.first_name,
    user.last_name,
  ]
    .filter(Boolean)
    .join(" ");


  const displayName =
    fullName || user.username;


  const studentStatus =
    STATUS_LABELS[
      user.student_status
    ] ||
    user.student_status ||
    "Not specified";


  const questionCount =
    assessment?.sections?.reduce(
      (
        total,
        section
      ) =>
        total +
        (
          section.questions?.length ||
          0
        ),
      0
    ) || 0;


  const responseScale =
    assessment
      ?.sections?.[0]
      ?.questions?.[0]
      ?.options?.length || 0;


  return (
    <div className="dashboard-page">

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

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* Welcome */}

        <section className="dashboard-welcome">

          <div>

            <p className="dashboard-eyebrow">
              YOUR NEUROMATRIX JOURNEY
            </p>

            <h1>
              Welcome back,{" "}
              {displayName}.
            </h1>

            <p>
              This is your personal space
              to explore yourself and
              your future.
            </p>

          </div>


          <div className="profile-avatar">

            {displayName
              .charAt(0)
              .toUpperCase()}

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
              {studentStatus}
            </strong>

          </div>


          <Link to="/profile">
            View Profile →
          </Link>

        </section>


        {/* Assessment */}

        <section className="assessment-dashboard-card">

          <div className="assessment-card-content">

            <p className="dashboard-eyebrow">
              YOUR ASSESSMENT
            </p>


            <h2>
              Discover more about yourself.
            </h2>


            <p>
              Your assessment is designed
              according to your current
              stage of education. Take your
              time and answer each statement
              honestly.
            </p>


            <div className="assessment-meta">

              <div>

                <span>
                  Questions
                </span>

                <strong>
                  {assessmentLoading
                    ? "..."
                    : questionCount}
                </strong>

              </div>


              <div>

                <span>
                  Response
                </span>

                <strong>
                  {assessmentLoading
                    ? "..."
                    : responseScale
                      ? `${responseScale} Point Scale`
                      : "—"}
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong>
                  Not Started
                </strong>

              </div>

            </div>


            {error && (
              <p>
                {error}
              </p>
            )}


            <Link
              to="/assessment"
              className="dashboard-start-button"
            >
              Start Assessment

              <span>
                →
              </span>

            </Link>

          </div>


          {/* Visual */}

          <div className="dashboard-card-visual">

            <div
              className="dashboard-orbit orbit-a"
            />

            <div
              className="dashboard-orbit orbit-b"
            />

            <div
              className="dashboard-center"
            >
              <span>
                NM
              </span>
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
                View and manage your
                personal information.
              </p>

            </div>


            <span className="small-card-arrow">
              →
            </span>

          </Link>


          <div
            className={
              "dashboard-small-card " +
              "disabled-card"
            }
          >

            <div className="small-card-icon">
              ◌
            </div>


            <div>

              <h3>
                My Report
              </h3>

              <p>
                Your personalized report
                will appear here after
                completing your assessment.
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