import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAssessment } from "../api/assessments";

import "../App.css";

const QUESTIONS_PER_PAGE = 10;

// Temporary during backend integration.
// Later this will come dynamically from the user's profile/route.
const ASSESSMENT_SLUG = "neuromatrix-personality";

function Assessment() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(
      "neuromatrix_assessment_answers"
    );

    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  // =========================================================
  // LOAD ASSESSMENT FROM DJANGO
  // =========================================================

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setLoading(true);

        const data = await getAssessment(ASSESSMENT_SLUG);

        setAssessment(data);
      } catch (err) {
        console.error("Failed to load assessment:", err);

        setError(
          "Unable to load the assessment. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, []);

  // =========================================================
  // SAVE ANSWERS TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      "neuromatrix_assessment_answers",
      JSON.stringify(answers)
    );
  }, [answers]);

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="questionnaire-page">
        <main className="questionnaire-main">
          <div className="assessment-top">
            <div>
              <p className="assessment-label">
                NeuroMatrix
              </p>

              <h1>Loading Assessment...</h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error || !assessment) {
    return (
      <div className="questionnaire-page">
        <main className="questionnaire-main">
          <div className="assessment-top">
            <div>
              <p className="assessment-label">
                NeuroMatrix
              </p>

              <h1>Unable to Load Assessment</h1>

              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // FLATTEN QUESTIONS FROM SECTIONS
  // =========================================================

  const questions = assessment.sections.flatMap(
    (section) => section.questions
  );

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    questions.length / QUESTIONS_PER_PAGE
  );

  const startIndex =
    currentPage * QUESTIONS_PER_PAGE;

  const endIndex = Math.min(
    startIndex + QUESTIONS_PER_PAGE,
    questions.length
  );

  const visibleQuestions = questions.slice(
    startIndex,
    endIndex
  );

  // =========================================================
  // ANSWER SELECTION
  // =========================================================

  const selectAnswer = (questionId, value) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  // =========================================================
  // CURRENT PAGE ANSWERS
  // =========================================================

  const answeredOnCurrentPage =
    visibleQuestions.filter(
      (question) => answers[question.id] !== undefined
    ).length;

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(
        (previous) => previous + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(
        (previous) => previous - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const submitAssessment = () => {
    console.log(
      "Assessment responses:",
      answers
    );

    navigate("/assessment/completed");
  };

  // =========================================================
  // PROGRESS
  // =========================================================

  const overallProgress =
    questions.length > 0
      ? (Object.keys(answers).length /
          questions.length) *
        100
      : 0;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="questionnaire-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <nav className="questionnaire-navbar">

        <div className="questionnaire-brand">
          <span>NeuroMatrix</span> Pathways
        </div>

        <div className="questionnaire-progress-text">
          {Object.keys(answers).length} /{" "}
          {questions.length} answered
        </div>

        <button
          className="exit-assessment"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Exit
        </button>

      </nav>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="questionnaire-main">

        {/* Header */}

        <div className="assessment-top">

          <div>

            <p className="assessment-label">
              {assessment.name}
            </p>

            <h1>
              Self-Discovery Assessment
            </h1>

          </div>

          <div className="page-counter">
            Section {currentPage + 1} of{" "}
            {totalPages}
          </div>

        </div>


        {/* Overall Progress */}

        <div className="question-progress">

          <div
            className="question-progress-bar"
            style={{
              width: `${overallProgress}%`,
            }}
          />

        </div>


        {/* Section Information */}

        <div className="assessment-section-info">

          <div>

            <span>
              QUESTIONS
            </span>

            <strong>
              {startIndex + 1}–{endIndex}
            </strong>

          </div>

          <p>
            Answer each statement based on how
            well it describes you.
          </p>

        </div>


        {/* =================================================
            QUESTIONS
        ================================================= */}

        <div className="question-list">

          {visibleQuestions.map(
            (question, index) => {

              const questionNumber =
                startIndex + index + 1;

              const selectedAnswer =
                answers[question.id];

              return (
                <section
                  className="scroll-question-card"
                  key={question.id}
                >

                  {/* Question Header */}

                  <div className="scroll-question-header">

                    <span className="scroll-question-number">
                      {String(
                        questionNumber
                      ).padStart(2, "0")}
                    </span>

                    <span className="question-status">

                      {selectedAnswer !==
                      undefined
                        ? "Answered"
                        : "Not answered"}

                    </span>

                  </div>


                  {/* Question */}

                  <div className="scroll-question-content">

                    <p>
                      How accurately does this
                      statement describe you?
                    </p>

                    <h2>
                      {question.text}
                    </h2>

                  </div>


                  {/* Dynamic Likert Options */}

                  <div className="scroll-likert">

                    {question.options.map(
                      (option) => {

                        const isSelected =
                          selectedAnswer ===
                          option.value;

                        return (
                          <button
                            key={option.id}
                            className={
                              isSelected
                                ? "scroll-likert-option selected"
                                : "scroll-likert-option"
                            }
                            onClick={() =>
                              selectAnswer(
                                question.id,
                                option.value
                              )
                            }
                          >

                            <span className="scroll-radio">

                              {isSelected && (
                                <span className="scroll-radio-dot" />
                              )}

                            </span>

                            <span>
                              {option.text}
                            </span>

                          </button>
                        );
                      }
                    )}

                  </div>

                </section>
              );
            }
          )}

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="scroll-navigation">

          <button
            className="question-prev"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            ← Previous 10
          </button>


          <div className="section-answer-count">

            {answeredOnCurrentPage} /{" "}
            {visibleQuestions.length} answered

          </div>


          {currentPage ===
          totalPages - 1 ? (

            <button
              className="question-next submit-assessment"
              onClick={submitAssessment}
              disabled={
                Object.keys(answers).length !==
                questions.length
              }
            >
              Submit Assessment

              <span>✓</span>
            </button>

          ) : (

            <button
              className="question-next"
              onClick={goToNextPage}
            >
              Next 10

              <span>→</span>
            </button>

          )}

        </div>


        {/* Footer */}

        <p className="assessment-footer-note">
          There are no right or wrong answers.
          Choose the response that best
          represents you.
        </p>

      </main>

    </div>
  );
}

export default Assessment;