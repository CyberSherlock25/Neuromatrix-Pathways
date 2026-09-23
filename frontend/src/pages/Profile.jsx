import {
  Link,
  useNavigate,
} from "react-router-dom";

import "../App.css";

import { useAuth } from "../context/AuthContext";


const STATUS_LABELS = {
  "8th": "8th Standard",
  "9th": "9th Standard",
  "10th": "10th Standard",
  "11th": "11th Standard",
  "12th": "12th Standard",
  "pursuing-ug": "Pursuing UG",
  "completed-ug": "Completed UG",
};


const STATUS_OPTIONS = [
  {
    value: "8th",
    label: "8th",
  },
  {
    value: "9th",
    label: "9th",
  },
  {
    value: "10th",
    label: "10th",
  },
  {
    value: "11th",
    label: "11th",
  },
  {
    value: "12th",
    label: "12th",
  },
  {
    value: "pursuing-ug",
    label: "Pursuing UG",
  },
  {
    value: "completed-ug",
    label: "Completed UG",
  },
];


function Profile() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();


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
    user.student_status || "";


  const studentStatusLabel =
    STATUS_LABELS[
      studentStatus
    ] ||
    studentStatus ||
    "Not specified";


  return (
    <div className="profile-page">

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

      <main className="profile-main">

        <div className="profile-heading">

          <p className="dashboard-eyebrow">
            YOUR PROFILE
          </p>

          <h1>
            Know your starting point.
          </h1>

          <p>
            Your profile helps NeuroMatrix
            understand where you are in
            your educational journey.
          </p>

        </div>


        {/* Basic Information */}

        <section className="profile-information">

          <div className="profile-user">

            <div className="profile-large-avatar">

              {displayName
                .charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <h2>
                {displayName}
              </h2>

              <p>
                {user.email}
              </p>

            </div>

          </div>


          <button
            className="profile-edit-button"
            type="button"
          >
            Edit Profile
          </button>

        </section>


        {/* Student Status */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <p className="dashboard-eyebrow">
                CURRENT STATUS
              </p>

              <h2>
                Where are you right now?
              </h2>

            </div>


            <span className="profile-status-badge">
              {studentStatusLabel}
            </span>

          </div>


          <div className="profile-status-grid">

            {STATUS_OPTIONS.map(
              (option) => (

                <div
                  key={option.value}
                  className={
                    studentStatus ===
                    option.value
                      ? "profile-status-card active"
                      : "profile-status-card"
                  }
                >

                  <span>
                    {option.label}
                  </span>


                  {studentStatus ===
                    option.value && (

                    <span
                      className={
                        "profile-status-check"
                      }
                    >
                      ✓
                    </span>

                  )}

                </div>

              )
            )}

          </div>

        </section>


        {/* Assessment */}

        <section className="profile-assessment">

          <div>

            <p className="dashboard-eyebrow">
              ASSESSMENT
            </p>

            <h2>
              Your assessment is
              waiting for you.
            </h2>

            <p>
              Your assessment will be
              based on your current
              student status.
            </p>

          </div>


          <Link
            to="/assessment"
            className="profile-assessment-button"
          >
            Start Assessment

            <span>
              →
            </span>

          </Link>

        </section>

      </main>

    </div>
  );
}


export default Profile;