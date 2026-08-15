import { Link } from "react-router-dom";
import "../App.css";

function Profile() {
  const student = {
    name: "Aditya",
    email: "aditya@example.com",
    status: "10th",
    assessmentCompleted: false,
  };

  const statuses = [
    { value: "8th", label: "8th" },
    { value: "9th", label: "9th" },
    { value: "10th", label: "10th" },
    { value: "11th", label: "11th" },
    { value: "12th", label: "12th" },
    { value: "pursuing-ug", label: "Pursuing UG" },
    { value: "completed-ug", label: "Completed UG" },
  ];

  return (
    <div className="profile-page">

      {/* Navbar */}

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


      {/* Main */}

      <main className="profile-main">

        <div className="profile-heading">

          <p className="dashboard-eyebrow">
            YOUR PROFILE
          </p>

          <h1>
            Know your starting point.
          </h1>

          <p>
            Your profile helps NeuroMatrix understand
            where you are in your educational journey.
          </p>

        </div>


        {/* Basic Information */}

        <section className="profile-information">

          <div className="profile-user">

            <div className="profile-large-avatar">
              {student.name.charAt(0)}
            </div>

            <div>

              <h2>
                {student.name}
              </h2>

              <p>
                {student.email}
              </p>

            </div>

          </div>

          <button className="profile-edit-button">
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
              {student.status === "pursuing-ug"
                ? "Pursuing UG"
                : student.status === "completed-ug"
                ? "Completed UG"
                : `${student.status} Standard`}
            </span>

          </div>


          <div className="profile-status-grid">

            {statuses.map((option) => (

              <div
                key={option.value}
                className={
                  student.status === option.value
                    ? "profile-status-card active"
                    : "profile-status-card"
                }
              >

                <span>
                  {option.label}
                </span>

                {student.status === option.value && (
                  <span className="profile-status-check">
                    ✓
                  </span>
                )}

              </div>

            ))}

          </div>

        </section>


        {/* Assessment Status */}

        <section className="profile-assessment">

          <div>

            <p className="dashboard-eyebrow">
              ASSESSMENT
            </p>

            <h2>
              {student.assessmentCompleted
                ? "Assessment completed"
                : "Your assessment is waiting for you."}
            </h2>

            <p>
              Your assessment will be based on your
              current student status.
            </p>

          </div>

          <Link
            to="/assessment"
            className="profile-assessment-button"
          >
            {student.assessmentCompleted
              ? "View Assessment"
              : "Start Assessment"}

            <span>→</span>
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Profile;