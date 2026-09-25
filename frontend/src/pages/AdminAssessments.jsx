import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  getAdminAssessments,
  createAdminAssessment,
  deleteAdminAssessment,
  updateAdminAssessment,
} from "../api/admin";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/admin.css";


const STUDENT_STATUS_OPTIONS = [
  {
    value: "8th",
    label: "8th Standard",
  },
  {
    value: "9th",
    label: "9th Standard",
  },
  {
    value: "10th",
    label: "10th Standard",
  },
  {
    value: "11th",
    label: "11th Standard",
  },
  {
    value: "12th",
    label: "12th Standard",
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


const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  version: "1.0",
  student_status: "",
  is_active: true,
};


const AdminAssessments = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();


  // =========================================================
  // ASSESSMENTS
  // =========================================================

  const [
    assessments,
    setAssessments,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  // =========================================================
  // FORM
  // =========================================================

  const [
    showForm,
    setShowForm,
  ] = useState(false);


  const [
    editingAssessment,
    setEditingAssessment,
  ] = useState(null);


  const [
    form,
    setForm,
  ] = useState(EMPTY_FORM);


  const [
    saving,
    setSaving,
  ] = useState(false);


  // =========================================================
  // LOAD ASSESSMENTS
  // =========================================================

  const loadAssessments = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getAdminAssessments();

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


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleFormChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {

    if (saving) return;


    setShowForm(false);

    setEditingAssessment(null);

    setForm({
      ...EMPTY_FORM,
    });

    setError("");

  };


  // =========================================================
  // OPEN CREATE FORM
  // =========================================================

  const handleOpenCreateForm = () => {

    setError("");

    setEditingAssessment(null);

    setForm({
      ...EMPTY_FORM,
    });

    setShowForm(true);

  };


  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const handleEdit = (assessment) => {

    setError("");

    setEditingAssessment(assessment);

    setForm({
      name: assessment.name || "",

      slug: assessment.slug || "",

      description:
        assessment.description || "",

      version:
        assessment.version || "1.0",

      student_status:
        assessment.assigned_student_status ||
        "",

      is_active:
        assessment.is_active ?? true,
    });

    setShowForm(true);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setSaving(true);
      setError("");


      const payload = {

        name:
          form.name.trim(),

        slug:
          form.slug
            .trim()
            .toLowerCase(),

        description:
          form.description.trim(),

        version:
          form.version.trim(),

        student_status:
          form.student_status || null,

        is_active:
          form.is_active,

      };


      // -----------------------------------------------------
      // UPDATE EXISTING ASSESSMENT
      // -----------------------------------------------------

      if (editingAssessment) {

        await updateAdminAssessment(
          editingAssessment.id,
          payload
        );

      }

      // -----------------------------------------------------
      // CREATE NEW ASSESSMENT
      // -----------------------------------------------------

      else {

        await createAdminAssessment(
          payload
        );

      }


      // -----------------------------------------------------
      // RESET FORM
      // -----------------------------------------------------

      setShowForm(false);

      setEditingAssessment(null);

      setForm({
        ...EMPTY_FORM,
      });


      // -----------------------------------------------------
      // REFRESH ASSESSMENTS
      // -----------------------------------------------------

      await loadAssessments();

    } catch (err) {

      console.error(err);

      const responseData =
        err.response?.data;


      if (responseData) {

        const firstError =
          Object.values(
            responseData
          )[0];


        setError(

          Array.isArray(firstError)

            ? firstError[0]

            : firstError ||
              "Unable to save assessment."

        );

      } else {

        setError(
          "Unable to save assessment."
        );

      }

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // TOGGLE ACTIVE STATUS
  // =========================================================

  const handleToggleStatus = async (
    assessment
  ) => {

    try {

      setError("");


      await updateAdminAssessment(
        assessment.id,
        {
          is_active:
            !assessment.is_active,
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


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (
    assessment
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${assessment.name}"?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");


      await deleteAdminAssessment(
        assessment.id
      );


      await loadAssessments();

    } catch (err) {

      console.error(err);


      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to delete assessment."
      );

    }

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="admin-layout">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <AdminSidebar />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">


        {/* ===================================================
            TOPBAR
        =================================================== */}

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


        {/* ===================================================
            CONTENT
        =================================================== */}

        <section className="admin-content">


          {/* =================================================
              TITLE
          ================================================= */}

          <div className="admin-title-row">

            <div>

              <h1 className="admin-title">
                Assessments
              </h1>


              <p className="admin-description">
                Create, configure and manage
                assessment definitions.
              </p>

            </div>


            <button
              type="button"
              className="admin-primary-button"
              onClick={
                handleOpenCreateForm
              }
            >
              + Create Assessment
            </button>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="admin-error">
              {error}
            </div>

          )}


          {/* =================================================
              CREATE / EDIT FORM
          ================================================= */}

          {showForm && (

            <div className="admin-panel">


              <div className="admin-panel-header">

                <div>

                  <div className="admin-panel-title">

                    {editingAssessment
                      ? "Edit Assessment"
                      : "Create Assessment"}

                  </div>


                  <div className="admin-panel-subtitle">

                    {editingAssessment
                      ? "Update the assessment information and assignment."
                      : "Define the basic assessment information."}

                  </div>

                </div>

              </div>


              <form
                style={{
                  padding: "20px",
                  display: "grid",
                  gap: "18px",
                }}
                onSubmit={handleSubmit}
              >


                {/* =================================================
                    ASSESSMENT NAME
                ================================================= */}

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Assessment Name
                  </label>


                  <input
                    className="admin-search"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    type="text"
                    name="name"
                    placeholder="e.g. 10th Standard Assessment"
                    value={form.name}
                    onChange={
                      handleFormChange
                    }
                    required
                  />

                </div>


                {/* =================================================
                    SLUG
                ================================================= */}

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Slug
                  </label>


                  <input
                    className="admin-search"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    type="text"
                    name="slug"
                    placeholder="e.g. assessment-10th"
                    value={form.slug}
                    onChange={
                      handleFormChange
                    }
                    required
                  />


                  <small
                    style={{
                      display: "block",
                      marginTop: "6px",
                      color: "#71717a",
                    }}
                  >
                    Use lowercase letters,
                    numbers and hyphens.
                  </small>

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Description
                  </label>


                  <textarea
                    className="admin-search"
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      boxSizing: "border-box",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    name="description"
                    placeholder="Describe the purpose of this assessment."
                    value={form.description}
                    onChange={
                      handleFormChange
                    }
                  />

                </div>


                {/* =================================================
                    VERSION
                ================================================= */}

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Version
                  </label>


                  <input
                    className="admin-search"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    type="text"
                    name="version"
                    placeholder="1.0"
                    value={form.version}
                    onChange={
                      handleFormChange
                    }
                    required
                  />

                </div>


                {/* =================================================
                    STUDENT STANDARD
                ================================================= */}

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Student Standard
                  </label>


                  <select
                    className="admin-search"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                    name="student_status"
                    value={
                      form.student_status
                    }
                    onChange={
                      handleFormChange
                    }
                    required
                  >

                    <option value="">
                      Select student standard
                    </option>


                    {STUDENT_STATUS_OPTIONS.map(
                      (option) => (

                        <option
                          key={
                            option.value
                          }
                          value={
                            option.value
                          }
                        >
                          {option.label}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* =================================================
                    ACTIVE
                ================================================= */}

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >

                  <input
                    type="checkbox"
                    name="is_active"
                    checked={
                      form.is_active
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                  Active assessment

                </label>


                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >

                  <button
                    type="button"
                    className="admin-action"
                    onClick={
                      handleCloseForm
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={saving}
                  >

                    {saving

                      ? editingAssessment
                        ? "Saving..."
                        : "Creating..."

                      : editingAssessment
                      ? "Save Changes"
                      : "Create Assessment"}

                  </button>

                </div>


              </form>

            </div>

          )}


          {/* =================================================
              ASSESSMENT LIBRARY
          ================================================= */}

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


            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (

              <div className="admin-loading">
                Loading assessments...
              </div>

            ) : assessments.length === 0 ? (

              /* =================================================
                 EMPTY
              ================================================= */

              <div className="admin-loading">
                No assessments found.
              </div>

            ) : (

              /* =================================================
                 TABLE
              ================================================= */

              <div className="admin-table-wrapper">

                <table className="admin-table">


                  <thead>

                    <tr>

                      <th>
                        Assessment
                      </th>

                      <th>
                        Version
                      </th>

                      <th>
                        Questions
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Actions
                      </th>

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


                          {/* ASSESSMENT */}

                          <td>

                            <div className="admin-assessment-name">
                              {assessment.name}
                            </div>


                            <div className="admin-assessment-slug">
                              {assessment.slug}
                            </div>

                          </td>


                          {/* VERSION */}

                          <td className="admin-version">
                            v{assessment.version}
                          </td>


                          {/* QUESTIONS */}

                          <td>

                            <span className="admin-question-count">
                              {
                                assessment.question_count
                              }
                            </span>

                          </td>


                          {/* STATUS */}

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


                          {/* ACTIONS */}

                          <td>

                            <div className="admin-actions">


                              {/* EDIT */}

                              <button
                                type="button"
                                className="admin-action"
                                onClick={() =>
                                  handleEdit(
                                    assessment
                                  )
                                }
                              >
                                Edit
                              </button>


                              {/* ACTIVATE / DEACTIVATE */}

                              <button
                                type="button"
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


                              {/* DELETE */}

                              <button
                                type="button"
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