import { useEffect, useState } from "react";
import {
  getAdminAssessments,
  deleteAdminAssessment,
  updateAdminAssessment,
} from "../api/admin";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminAssessments = () => {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssessments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminAssessments();

      setAssessments(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Unable to load assessments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleToggleStatus = async (assessment) => {
    try {
      await updateAdminAssessment(
        assessment.id,
        {
          is_active: !assessment.is_active,
        }
      );

      await loadAssessments();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to update assessment."
      );
    }
  };

  const handleDelete = async (assessment) => {
    const confirmed = window.confirm(
      `Delete "${assessment.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteAdminAssessment(
        assessment.id
      );

      await loadAssessments();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to delete assessment."
      );
    }
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-brand-logo">
            N
          </div>

          <div>
            <div className="admin-brand-text">
              Neuromatrix
            </div>

            <span className="admin-brand-subtitle">
              ADMIN CONSOLE
            </span>
          </div>
        </div>

        <nav className="admin-nav">

          <div className="admin-nav-label">
            Workspace
          </div>

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin")
            }
          >
            <span className="admin-nav-icon">
              ▦
            </span>
            Dashboard
          </button>

          <button className="admin-nav-item active">
            <span className="admin-nav-icon">
              ◈
            </span>
            Assessments
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ☷
            </span>
            Question Bank
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ◉
            </span>
            Dimensions
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ⚙
            </span>
            Scoring
          </button>

          <div
            className="admin-nav-label"
            style={{ marginTop: "25px" }}
          >
            Operations
          </div>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ♙
            </span>
            Psychologists
          </button>

          <button className="admin-nav-item">
            <span className="admin-nav-icon">
              ◫
            </span>
            Reports
          </button>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="admin-main">

        <header className="admin-topbar">

          <div>
            <div className="admin-page-heading">
              Assessments
            </div>

            <div className="admin-breadcrumb">
              Neuromatrix / Assessments
            </div>
          </div>

          <div className="admin-status">
            <span className="admin-status-dot" />
            System Online
          </div>

        </header>


        <section className="admin-content">

          <div className="admin-title-row">

            <div>
              <h1 className="admin-title">
                Assessments
              </h1>

              <p className="admin-description">
                Create, configure and manage assessment
                definitions.
              </p>
            </div>

            <button className="admin-primary-button">
              + Create Assessment
            </button>

          </div>


          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}


          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>
                <div className="admin-panel-title">
                  Assessment Library
                </div>

                <div className="admin-panel-subtitle">
                  {assessments.length} assessment
                  {assessments.length !== 1
                    ? "s"
                    : ""}{" "}
                  configured
                </div>
              </div>

              <input
                className="admin-search"
                placeholder="Search assessments..."
              />

            </div>


            {loading ? (

              <div className="admin-loading">
                Loading assessments...
              </div>

            ) : assessments.length === 0 ? (

              <div className="admin-loading">
                No assessments found.
              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>
                      <th>Assessment</th>
                      <th>Version</th>
                      <th>Questions</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {assessments.map(
                      (assessment) => (

                        <tr
                          key={
                            assessment.id
                          }
                        >

                          <td>

                            <div className="admin-assessment-name">
                              {
                                assessment.name
                              }
                            </div>

                            <div className="admin-assessment-slug">
                              {
                                assessment.slug
                              }
                            </div>

                          </td>


                          <td className="admin-version">
                            v
                            {
                              assessment.version
                            }
                          </td>


                          <td>

                            <span className="admin-question-count">
                              {
                                assessment.question_count
                              }
                            </span>

                          </td>


                          <td>

                            <span
                              className={`admin-badge ${
                                assessment.is_active
                                  ? "active"
                                  : "inactive"
                              }`}
                            >

                              <span className="admin-badge-dot" />

                              {assessment.is_active
                                ? "Active"
                                : "Inactive"}

                            </span>

                          </td>


                          <td>

                            <div className="admin-actions">

                              <button
                                className="admin-action"
                              >
                                Edit
                              </button>

                              <button
                                className="admin-action"
                                onClick={() =>
                                  handleToggleStatus(
                                    assessment
                                  )
                                }
                              >
                                {assessment.is_active
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>

                              <button
                                className="admin-action danger"
                                onClick={() =>
                                  handleDelete(
                                    assessment
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
};

export default AdminAssessments;