import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/admin.css";

import { useAuth } from "../context/AuthContext";

import {
  getAdminAssessments,
} from "../api/admin";

import {
  getSections,
  createSection,
  getQuestions,
  createQuestion,
  createOption,
} from "../api/adminQuestions";


const DEFAULT_OPTIONS = [
  {
    text: "Strongly Disagree",
    value: 1,
    order: 1,
  },
  {
    text: "Disagree",
    value: 2,
    order: 2,
  },
  {
    text: "Neutral",
    value: 3,
    order: 3,
  },
  {
    text: "Agree",
    value: 4,
    order: 4,
  },
  {
    text: "Strongly Agree",
    value: 5,
    order: 5,
  },
];


const AdminQuestionBank = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();


  // =========================================================
  // ASSESSMENTS
  // =========================================================

  const [assessments, setAssessments] = useState([]);

  const [selectedAssessmentId, setSelectedAssessmentId] =
    useState("6");


  // =========================================================
  // SECTIONS
  // =========================================================

  const [sections, setSections] = useState([]);

  const [selectedSectionId, setSelectedSectionId] =
    useState("2");


  // =========================================================
  // QUESTIONS
  // =========================================================

  const [questions, setQuestions] = useState([]);


  // =========================================================
  // LOADING
  // =========================================================

  const [loadingAssessments, setLoadingAssessments] =
    useState(true);

  const [loadingSections, setLoadingSections] =
    useState(false);

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [saving, setSaving] =
    useState(false);


  // =========================================================
  // UI
  // =========================================================

  const [showSectionForm, setShowSectionForm] =
    useState(false);

  const [showQuestionForm, setShowQuestionForm] =
    useState(false);


  // =========================================================
  // FORMS
  // =========================================================

  const [sectionName, setSectionName] =
    useState("");

  const [sectionDescription, setSectionDescription] =
    useState("");


  const [questionText, setQuestionText] =
    useState("");


  // =========================================================
  // ERROR / SUCCESS
  // =========================================================

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =========================================================
  // LOAD ASSESSMENTS
  // =========================================================

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        setLoadingAssessments(true);
        setError("");

        const data = await getAdminAssessments();

        setAssessments(data);

        // Keep test assessment ID 6 if it exists.
        const testAssessment = data.find(
          (assessment) =>
            Number(assessment.id) === 6
        );

        if (testAssessment) {
          setSelectedAssessmentId("6");
        } else if (data.length > 0) {
          setSelectedAssessmentId(
            String(data[0].id)
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Unable to load assessments."
        );
      } finally {
        setLoadingAssessments(false);
      }
    };

    loadAssessments();
  }, []);


  // =========================================================
  // LOAD SECTIONS
  // =========================================================

  useEffect(() => {
    if (!selectedAssessmentId) {
      return;
    }

    const loadSections = async () => {
      try {
        setLoadingSections(true);
        setError("");

        const data = await getSections(
          selectedAssessmentId
        );

        setSections(data);

        if (data.length > 0) {
          // Prefer the existing Test Questions section.
          const testSection = data.find(
            (section) =>
              section.name === "Test Questions"
          );

          setSelectedSectionId(
            String(
              testSection?.id ||
              data[0].id
            )
          );
        } else {
          setSelectedSectionId("");
        }
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
          "Unable to load sections."
        );
      } finally {
        setLoadingSections(false);
      }
    };

    loadSections();
  }, [selectedAssessmentId]);


  // =========================================================
  // LOAD QUESTIONS
  // =========================================================

  useEffect(() => {
    if (!selectedSectionId) {
      setQuestions([]);
      return;
    }

    const loadQuestions = async () => {
      try {
        setLoadingQuestions(true);
        setError("");

        const data = await getQuestions(
          selectedSectionId
        );

        setQuestions(data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
          "Unable to load questions."
        );
      } finally {
        setLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [selectedSectionId]);


  // =========================================================
  // CHANGE ASSESSMENT
  // =========================================================

  const handleAssessmentChange = (event) => {
    setSelectedAssessmentId(
      event.target.value
    );

    setSuccess("");
    setError("");
  };


  // =========================================================
  // CHANGE SECTION
  // =========================================================

  const handleSectionChange = (event) => {
    setSelectedSectionId(
      event.target.value
    );

    setSuccess("");
    setError("");
  };


  // =========================================================
  // CREATE SECTION
  // =========================================================

  const handleCreateSection = async (event) => {
    event.preventDefault();

    if (!selectedAssessmentId) {
      setError("Please select an assessment.");
      return;
    }

    if (!sectionName.trim()) {
      setError("Section name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const newSection = await createSection({
        assessment:
          Number(selectedAssessmentId),

        name:
          sectionName.trim(),

        description:
          sectionDescription.trim(),

        order:
          sections.length + 1,
      });

      setSections((current) => [
        ...current,
        newSection,
      ]);

      setSelectedSectionId(
        String(newSection.id)
      );

      setSectionName("");
      setSectionDescription("");

      setShowSectionForm(false);

      setSuccess(
        "Section created successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Unable to create section."
      );
    } finally {
      setSaving(false);
    }
  };


  // =========================================================
  // CREATE QUESTION + OPTIONS
  // =========================================================

  const handleCreateQuestion = async (event) => {
    event.preventDefault();

    if (!selectedSectionId) {
      setError("Please select a section.");
      return;
    }

    if (!questionText.trim()) {
      setError("Question text is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // -----------------------------------------------
      // CREATE QUESTION
      // -----------------------------------------------

      const newQuestion =
        await createQuestion({
          section:
            Number(selectedSectionId),

          text:
            questionText.trim(),

          question_type:
            "likert",

          order:
            questions.length + 1,

          is_required:
            true,

          is_active:
            true,
        });


      // -----------------------------------------------
      // CREATE FIVE OPTIONS
      // -----------------------------------------------

      const createdOptions = [];

      for (const option of DEFAULT_OPTIONS) {
        const createdOption =
          await createOption({
            question:
              newQuestion.id,

            text:
              option.text,

            value:
              option.value,

            order:
              option.order,
          });

        createdOptions.push(
          createdOption
        );
      }


      // -----------------------------------------------
      // ADD QUESTION TO UI
      // -----------------------------------------------

      setQuestions((current) => [
        ...current,
        {
          ...newQuestion,
          options:
            createdOptions,
        },
      ]);

      setQuestionText("");

      setShowQuestionForm(false);

      setSuccess(
        "Question and five options created successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to create question."
      );
    } finally {
      setSaving(false);
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
  // SELECTED DATA
  // =========================================================

  const selectedAssessment =
    assessments.find(
      (assessment) =>
        String(assessment.id) ===
        String(selectedAssessmentId)
    );

  const selectedSection =
    sections.find(
      (section) =>
        String(section.id) ===
        String(selectedSectionId)
    );


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="admin-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

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
            type="button"
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


          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin/assessments")
            }
          >
            <span className="admin-nav-icon">
              ◈
            </span>

            Assessments
          </button>


          <button
            type="button"
            className="admin-nav-item active"
          >
            <span className="admin-nav-icon">
              ☷
            </span>

            Question Bank
          </button>


          <button
            type="button"
            className="admin-nav-item"
            onClick={()=>
            navigate("/admin/dimensions")
          }
          >
            <span className="admin-nav-icon">
              ◉
            </span>

            Dimensions
          </button>


          <button
            type="button"
            className="admin-nav-item"
          >
            <span className="admin-nav-icon">
              ⚙
            </span>

            Scoring
          </button>


          <div
            className="admin-nav-label"
            style={{
              marginTop: "25px",
            }}
          >
            Operations
          </div>


          <button
            type="button"
            className="admin-nav-item"
          >
            <span className="admin-nav-icon">
              ♙
            </span>

            Psychologists
          </button>


          <button
            type="button"
            className="admin-nav-item"
          >
            <span className="admin-nav-icon">
              ◫
            </span>

            Reports
          </button>


          <div
            className="admin-nav-label"
            style={{
              marginTop: "25px",
            }}
          >
            Account
          </div>


          <button
            type="button"
            className="admin-nav-item"
            onClick={handleLogout}
          >
            <span className="admin-nav-icon">
              ↪
            </span>

            Logout
          </button>

        </nav>

      </aside>


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
              Question Bank
            </div>

            <div className="admin-breadcrumb">
              Neuromatrix / Question Bank
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
                Question Bank
              </h1>

              <p className="admin-description">
                Create and manage assessment
                questions and response options.
              </p>

            </div>


            <button
              type="button"
              className="admin-primary-button"
              onClick={() =>
                setShowQuestionForm(
                  !showQuestionForm
                )
              }
              disabled={!selectedSectionId}
            >
              + Add Question
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
              SUCCESS
          ================================================= */}

          {success && (
            <div
              style={{
                marginBottom: "20px",
                padding: "12px 15px",
                borderRadius: "8px",
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                color: "#047857",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}


          {/* =================================================
              ASSESSMENT / SECTION SELECTOR
          ================================================= */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Assessment Structure
                </div>

                <div className="admin-panel-subtitle">
                  Select an assessment and section
                  to manage its questions.
                </div>

              </div>

            </div>


            <div
              style={{
                padding: "20px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >

              {/* ASSESSMENT */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Assessment
                </label>


                <select
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  value={
                    selectedAssessmentId
                  }
                  onChange={
                    handleAssessmentChange
                  }
                  disabled={
                    loadingAssessments
                  }
                >

                  {loadingAssessments ? (
                    <option>
                      Loading assessments...
                    </option>
                  ) : (
                    assessments.map(
                      (assessment) => (
                        <option
                          key={
                            assessment.id
                          }
                          value={
                            assessment.id
                          }
                        >
                          {assessment.name}
                        </option>
                      )
                    )
                  )}

                </select>

              </div>


              {/* SECTION */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Section
                </label>


                <select
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  value={
                    selectedSectionId
                  }
                  onChange={
                    handleSectionChange
                  }
                  disabled={
                    loadingSections ||
                    sections.length === 0
                  }
                >

                  {loadingSections ? (
                    <option>
                      Loading sections...
                    </option>
                  ) : sections.length === 0 ? (
                    <option>
                      No sections available
                    </option>
                  ) : (
                    sections.map(
                      (section) => (
                        <option
                          key={
                            section.id
                          }
                          value={
                            section.id
                          }
                        >
                          {section.name}
                        </option>
                      )
                    )
                  )}

                </select>

              </div>

            </div>


            {/* CURRENT STRUCTURE */}

            {selectedAssessment &&
              selectedSection && (
                <div
                  style={{
                    padding:
                      "0 20px 20px",
                  }}
                >

                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "8px",
                      background:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >

                    <strong>
                      {selectedAssessment.name}
                    </strong>

                    <span
                      style={{
                        margin:
                          "0 10px",
                        color:
                          "#94a3b8",
                      }}
                    >
                      /
                    </span>

                    <span>
                      {selectedSection.name}
                    </span>

                  </div>

                </div>
              )}

          </div>


          {/* =================================================
              CREATE SECTION
          ================================================= */}

          <div
            className="admin-panel"
            style={{
              marginTop: "20px",
            }}
          >

            <div
              className="admin-panel-header"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                setShowSectionForm(
                  !showSectionForm
                )
              }
            >

              <div>

                <div className="admin-panel-title">
                  Section Management
                </div>

                <div className="admin-panel-subtitle">
                  Add a new section to the
                  selected assessment.
                </div>

              </div>


              <button
                type="button"
                className="admin-action"
                onClick={(event) => {
                  event.stopPropagation();

                  setShowSectionForm(
                    !showSectionForm
                  );
                }}
              >
                {showSectionForm
                  ? "Close"
                  : "+ New Section"}
              </button>

            </div>


            {showSectionForm && (
              <form
                onSubmit={
                  handleCreateSection
                }
                style={{
                  padding: "20px",
                  display: "grid",
                  gap: "15px",
                }}
              >

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Section Name
                  </label>

                  <input
                    className="admin-search"
                    style={{
                      width: "100%",
                      boxSizing:
                        "border-box",
                    }}
                    value={sectionName}
                    onChange={(event) =>
                      setSectionName(
                        event.target.value
                      )
                    }
                    placeholder="e.g. Test Questions"
                    required
                  />

                </div>


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
                      minHeight: "90px",
                      boxSizing:
                        "border-box",
                      resize: "vertical",
                    }}
                    value={
                      sectionDescription
                    }
                    onChange={(event) =>
                      setSectionDescription(
                        event.target.value
                      )
                    }
                    placeholder="Describe this section..."
                  />

                </div>


                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    gap: "10px",
                  }}
                >

                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      setShowSectionForm(
                        false
                      );

                      setSectionName("");
                      setSectionDescription("");
                    }}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Creating..."
                      : "Create Section"}
                  </button>

                </div>

              </form>
            )}

          </div>


          {/* =================================================
              ADD QUESTION FORM
          ================================================= */}

          {showQuestionForm && (
            <div
              className="admin-panel"
              style={{
                marginTop: "20px",
              }}
            >

              <div className="admin-panel-header">

                <div>

                  <div className="admin-panel-title">
                    Create Question
                  </div>

                  <div className="admin-panel-subtitle">
                    A Likert question will be
                    created with five standard
                    response options.
                  </div>

                </div>

              </div>


              <form
                onSubmit={
                  handleCreateQuestion
                }
                style={{
                  padding: "20px",
                  display: "grid",
                  gap: "18px",
                }}
              >

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Question
                  </label>


                  <textarea
                    className="admin-search"
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      boxSizing:
                        "border-box",
                      resize: "vertical",
                    }}
                    value={questionText}
                    onChange={(event) =>
                      setQuestionText(
                        event.target.value
                      )
                    }
                    placeholder="Enter the assessment question..."
                    required
                  />

                </div>


                {/* PREVIEW OPTIONS */}

                <div>

                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Response Options
                  </div>


                  <div
                    style={{
                      display: "grid",
                      gap: "8px",
                    }}
                  >

                    {DEFAULT_OPTIONS.map(
                      (option) => (
                        <div
                          key={
                            option.order
                          }
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "space-between",
                            padding:
                              "11px 14px",
                            border:
                              "1px solid #e2e8f0",
                            borderRadius:
                              "8px",
                            background:
                              "#f8fafc",
                          }}
                        >

                          <span>
                            {option.text}
                          </span>

                          <strong>
                            {option.value}
                          </strong>

                        </div>
                      )
                    )}

                  </div>

                </div>


                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    gap: "10px",
                  }}
                >

                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      setShowQuestionForm(
                        false
                      );

                      setQuestionText("");
                    }}
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
                      ? "Creating..."
                      : "Create Question"}
                  </button>

                </div>

              </form>

            </div>
          )}


          {/* =================================================
              QUESTIONS
          ================================================= */}

          <div
            className="admin-panel"
            style={{
              marginTop: "20px",
            }}
          >

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Questions
                </div>

                <div className="admin-panel-subtitle">
                  {questions.length} question
                  {questions.length !== 1
                    ? "s"
                    : ""}{" "}
                  in this section
                </div>

              </div>


              {selectedSectionId && (
                <span
                  className="admin-badge active"
                >
                  Section #{selectedSectionId}
                </span>
              )}

            </div>


            {loadingQuestions ? (

              <div className="admin-loading">
                Loading questions...
              </div>

            ) : questions.length === 0 ? (

              <div
                style={{
                  padding: "45px 20px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >

                <div
                  style={{
                    fontSize: "38px",
                    marginBottom: "10px",
                  }}
                >
                  ☷
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#334155",
                    marginBottom: "5px",
                  }}
                >
                  No questions yet
                </div>

                <div
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Click "Add Question" to
                  create the first question.
                </div>

              </div>

            ) : (

              <div
                style={{
                  padding: "20px",
                  display: "grid",
                  gap: "16px",
                }}
              >

                {questions.map(
                  (question, index) => (

                    <div
                      key={
                        question.id
                      }
                      style={{
                        border:
                          "1px solid #e2e8f0",
                        borderRadius:
                          "10px",
                        padding:
                          "18px",
                        background:
                          "#ffffff",
                      }}
                    >

                      {/* QUESTION HEADER */}

                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: "20px",
                          marginBottom:
                            "15px",
                        }}
                      >

                        <div>

                          <div
                            style={{
                              fontSize:
                                "12px",
                              fontWeight:
                                "700",
                              color:
                                "#64748b",
                              marginBottom:
                                "6px",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Question{" "}
                            {index + 1}
                          </div>


                          <div
                            style={{
                              fontSize:
                                "16px",
                              fontWeight:
                                "600",
                              color:
                                "#0f3554",
                              lineHeight:
                                "1.5",
                            }}
                          >
                            {question.text}
                          </div>

                        </div>


                        <span
                          className="admin-badge active"
                        >
                          {question.question_type}
                        </span>

                      </div>


                      {/* OPTIONS */}

                      <div
                        style={{
                          display:
                            "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: "8px",
                        }}
                      >

                        {(
                          question.options ||
                          []
                        ).map(
                          (option) => (

                            <div
                              key={
                                option.id
                              }
                              style={{
                                padding:
                                  "10px 12px",
                                border:
                                  "1px solid #e2e8f0",
                                borderRadius:
                                  "7px",
                                background:
                                  "#f8fafc",
                                display:
                                  "flex",
                                justifyContent:
                                  "space-between",
                                gap: "10px",
                              }}
                            >

                              <span>
                                {option.text}
                              </span>

                              <strong>
                                {option.value}
                              </strong>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
};


export default AdminQuestionBank;