import { useEffect, useState } from "react";

import "../styles/admin.css";

import {
  getAdminAssessments,
} from "../api/admin";

import {
  getSections,
  getQuestions,
} from "../api/adminQuestions";

import {
  getDimensions,
  getQuestionDimensions,
  createQuestionDimension,
} from "../api/adminMappings";

import AdminSidebar from "../components/AdminSidebar";


const AdminQuestionMappings = () => {

  const [
    assessments,
    setAssessments,
  ] = useState([]);


  const [
    sections,
    setSections,
  ] = useState([]);


  const [
    questions,
    setQuestions,
  ] = useState([]);


  const [
    dimensions,
    setDimensions,
  ] = useState([]);


  const [
    mappings,
    setMappings,
  ] = useState([]);


  const [
    selectedAssessmentId,
    setSelectedAssessmentId,
  ] = useState("");


  const [
    selectedSectionId,
    setSelectedSectionId,
  ] = useState("");


  const [
    selectedQuestionId,
    setSelectedQuestionId,
  ] = useState("");


  const [
    selectedDimensionId,
    setSelectedDimensionId,
  ] = useState("");


  const [
    weight,
    setWeight,
  ] = useState("1.0");


  const [
    reverseScored,
    setReverseScored,
  ] = useState(false);


  const [
    loadingAssessments,
    setLoadingAssessments,
  ] = useState(true);


  const [
    loadingSections,
    setLoadingSections,
  ] = useState(false);


  const [
    loadingQuestions,
    setLoadingQuestions,
  ] = useState(false);


  const [
    loadingDimensions,
    setLoadingDimensions,
  ] = useState(false);


  const [
    loadingMappings,
    setLoadingMappings,
  ] = useState(false);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  /* =========================================================
     LOAD ASSESSMENTS
  ========================================================= */

  useEffect(() => {

    const loadAssessments = async () => {

      try {

        setLoadingAssessments(true);
        setError("");

        const data =
          await getAdminAssessments();

        setAssessments(data);


        const testAssessment =
          data.find(
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


  /* =========================================================
     LOAD SECTIONS
  ========================================================= */

  useEffect(() => {

    if (!selectedAssessmentId) {
      return;
    }


    const loadSections = async () => {

      try {

        setLoadingSections(true);
        setError("");

        const data =
          await getSections(
            selectedAssessmentId
          );

        setSections(data);


        if (data.length > 0) {

          const testSection =
            data.find(
              (section) =>
                section.name ===
                "Test Questions"
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


  /* =========================================================
     LOAD QUESTIONS
  ========================================================= */

  useEffect(() => {

    if (!selectedSectionId) {

      setQuestions([]);

      return;

    }


    const loadQuestions = async () => {

      try {

        setLoadingQuestions(true);
        setError("");

        const data =
          await getQuestions(
            selectedSectionId
          );

        setQuestions(data);


        if (data.length > 0) {

          setSelectedQuestionId(
            String(data[0].id)
          );

        } else {

          setSelectedQuestionId("");

        }

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


  /* =========================================================
     LOAD DIMENSIONS
  ========================================================= */

  useEffect(() => {

    const loadDimensions = async () => {

      try {

        setLoadingDimensions(true);

        const data =
          await getDimensions();

        setDimensions(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          err.response?.data?.detail ||
          "Unable to load dimensions."
        );

      } finally {

        setLoadingDimensions(false);

      }

    };


    loadDimensions();

  }, []);


  /* =========================================================
     LOAD MAPPINGS
  ========================================================= */

  const loadMappings = async () => {

    if (!selectedQuestionId) {

      setMappings([]);

      return;

    }


    try {

      setLoadingMappings(true);
      setError("");

      const data =
        await getQuestionDimensions({
          questionId:
            selectedQuestionId,
        });


      setMappings(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Unable to load mappings."
      );

    } finally {

      setLoadingMappings(false);

    }

  };


  useEffect(() => {

    loadMappings();

  }, [selectedQuestionId]);


  /* =========================================================
     ASSESSMENT CHANGE
  ========================================================= */

  const handleAssessmentChange = (
    event
  ) => {

    setSelectedAssessmentId(
      event.target.value
    );

    setSuccess("");
    setError("");

  };


  /* =========================================================
     SECTION CHANGE
  ========================================================= */

  const handleSectionChange = (
    event
  ) => {

    setSelectedSectionId(
      event.target.value
    );

    setSuccess("");
    setError("");

  };


  /* =========================================================
     QUESTION CHANGE
  ========================================================= */

  const handleQuestionChange = (
    event
  ) => {

    setSelectedQuestionId(
      event.target.value
    );

    setSuccess("");
    setError("");

  };


  /* =========================================================
     CREATE MAPPING
  ========================================================= */

  const handleCreateMapping = async (
    event
  ) => {

    event.preventDefault();


    setError("");
    setSuccess("");


    if (!selectedQuestionId) {

      setError(
        "Please select a question."
      );

      return;

    }


    if (!selectedDimensionId) {

      setError(
        "Please select a dimension."
      );

      return;

    }


    const numericWeight =
      Number(weight);


    if (
      Number.isNaN(numericWeight) ||
      numericWeight <= 0
    ) {

      setError(
        "Weight must be greater than 0."
      );

      return;

    }


    const duplicate =
      mappings.some(
        (mapping) =>
          Number(mapping.dimension) ===
          Number(selectedDimensionId)
      );


    if (duplicate) {

      setError(
        "This question is already mapped to the selected dimension."
      );

      return;

    }


    try {

      setSaving(true);


      await createQuestionDimension({
        question:
          Number(selectedQuestionId),

        dimension:
          Number(selectedDimensionId),

        weight:
          numericWeight,

        reverse_scored:
          reverseScored,
      });


      setSuccess(
        "Question-dimension mapping created successfully."
      );


      setSelectedDimensionId("");
      setWeight("1.0");
      setReverseScored(false);


      await loadMappings();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to create mapping."
      );

    } finally {

      setSaving(false);

    }

  };


  const selectedQuestion =
    questions.find(
      (question) =>
        String(question.id) ===
        String(selectedQuestionId)
    );


  return (

    <div className="admin-layout">

      <AdminSidebar />


      <main className="admin-main">


        <header className="admin-topbar">

          <div>

            <div className="admin-page-heading">
              Question Mappings
            </div>

            <div className="admin-breadcrumb">
              Neuromatrix / Mappings
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
                Question → Dimension Mapping
              </h1>

              <p className="admin-description">
                Connect assessment questions to psychological
                dimensions used by the scoring engine.
              </p>

            </div>

          </div>


          {error && (

            <div className="admin-error">
              {error}
            </div>

          )}


          {success && (

            <div
              style={{
                padding: "12px 15px",
                marginBottom: "18px",
                border: "1px solid #c6e4e4",
                borderRadius: "8px",
                background: "#edf7f7",
                color: "#247f91",
                fontSize: "11px",
              }}
            >
              {success}
            </div>

          )}


          {/* CREATE MAPPING */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Create Mapping
                </div>

                <div className="admin-panel-subtitle">
                  Assign a question to a scoring dimension.
                </div>

              </div>

            </div>


            <form
              onSubmit={handleCreateMapping}
              style={{
                padding: "22px",
                display: "grid",
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
                    color: "#294d63",
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
                    color: "#294d63",
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


              {/* QUESTION */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Question
                </label>


                <select
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  value={
                    selectedQuestionId
                  }
                  onChange={
                    handleQuestionChange
                  }
                  disabled={
                    loadingQuestions ||
                    questions.length === 0
                  }
                >

                  {loadingQuestions ? (

                    <option>
                      Loading questions...
                    </option>

                  ) : (

                    questions.map(
                      (question) => (

                        <option
                          key={
                            question.id
                          }
                          value={
                            question.id
                          }
                        >
                          Q{question.id} —{" "}
                          {question.text}
                        </option>

                      )
                    )

                  )}

                </select>

              </div>


              {/* DIMENSION */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Dimension
                </label>


                <select
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  value={
                    selectedDimensionId
                  }
                  onChange={(event) =>
                    setSelectedDimensionId(
                      event.target.value
                    )
                  }
                  disabled={
                    loadingDimensions
                  }
                >

                  <option value="">
                    Select dimension
                  </option>


                  {dimensions.map(
                    (dimension) => (

                      <option
                        key={
                          dimension.id
                        }
                        value={
                          dimension.id
                        }
                      >
                        {dimension.name}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* WEIGHT */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Weight
                </label>


                <input
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={weight}
                  onChange={(event) =>
                    setWeight(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* REVERSE */}

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#294d63",
                  cursor: "pointer",
                }}
              >

                <input
                  type="checkbox"
                  checked={
                    reverseScored
                  }
                  onChange={(event) =>
                    setReverseScored(
                      event.target.checked
                    )
                  }
                />

                Reverse scored

              </label>


              {/* ACTION */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={
                    saving ||
                    !selectedQuestionId
                  }
                >
                  {saving
                    ? "Creating..."
                    : "Add Mapping"}
                </button>

              </div>

            </form>

          </div>


          {/* EXISTING MAPPINGS */}

          <div
            className="admin-panel"
            style={{
              marginTop: "25px",
            }}
          >

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Existing Mappings
                </div>

                <div className="admin-panel-subtitle">

                  {selectedQuestion
                    ? "Mappings for the selected question."
                    : "Select a question to view mappings."}

                </div>

              </div>


              <button
                type="button"
                className="admin-action"
                onClick={
                  loadMappings
                }
                disabled={
                  loadingMappings
                }
              >
                {loadingMappings
                  ? "Loading..."
                  : "Refresh"}
              </button>

            </div>


            {loadingMappings ? (

              <div className="admin-loading">
                Loading mappings...
              </div>

            ) : mappings.length === 0 ? (

              <div className="admin-loading">
                No mappings found for this question.
              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>

                      <th>
                        Question
                      </th>

                      <th>
                        Dimension
                      </th>

                      <th>
                        Weight
                      </th>

                      <th>
                        Reverse
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {mappings.map(
                      (mapping) => {

                        const dimension =
                          dimensions.find(
                            (item) =>
                              Number(
                                item.id
                              ) ===
                              Number(
                                mapping.dimension
                              )
                          );


                        return (

                          <tr
                            key={
                              mapping.id
                            }
                          >

                            <td>
                              Q
                              {
                                selectedQuestionId
                              }
                            </td>

                            <td>

                              <div className="admin-assessment-name">
                                {dimension?.name ||
                                  `Dimension #${mapping.dimension}`}
                              </div>

                              {dimension?.code && (

                                <div className="admin-assessment-slug">
                                  {dimension.code}
                                </div>

                              )}

                            </td>

                            <td>
                              {mapping.weight}
                            </td>

                            <td>

                              <span
                                className={`admin-badge ${
                                  mapping.reverse_scored
                                    ? "active"
                                    : "inactive"
                                }`}
                              >
                                {mapping.reverse_scored
                                  ? "Yes"
                                  : "No"}
                              </span>

                            </td>

                          </tr>

                        );

                      }
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


export default AdminQuestionMappings;