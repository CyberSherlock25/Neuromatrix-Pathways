import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAssessment,
  startAttempt,
  saveResponse,
  completeAttempt,
} from "../api/assessments";

import "../App.css";

const QUESTIONS_PER_PAGE = 10;

const ASSESSMENT_SLUG = "neuromatrix-personality";

const ANSWERS_STORAGE_KEY =
  "neuromatrix_assessment_answers";

const ATTEMPT_STORAGE_KEY =
  "neuromatrix_assessment_attempt";

function Assessment() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [attemptId, setAttemptId] = useState(() => {
    return localStorage.getItem(ATTEMPT_STORAGE_KEY);
  });

  const [currentPage, setCurrentPage] = useState(0);

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(
      ANSWERS_STORAGE_KEY
    );

    return savedAnswers
      ? JSON.parse(savedAnswers)
      : {};
  });

  const [savingQuestion, setSavingQuestion] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // LOAD ASSESSMENT + START ATTEMPT
  // =========================================================

  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load assessment definition
        const data = await getAssessment(
          ASSESSMENT_SLUG
        );

        setAssessment(data);

        // -----------------------------------------------------
        // Reuse an existing attempt if one exists
        // -----------------------------------------------------

        let currentAttemptId = localStorage.getItem(
          ATTEMPT_STORAGE_KEY
        );

        // -----------------------------------------------------
        // Otherwise create a new attempt
        // -----------------------------------------------------

        if (!currentAttemptId) {
          const sessionId = crypto.randomUUID();

          const attempt = await startAttempt(
            ASSESSMENT_SLUG,
            sessionId
          );

          currentAttemptId = String(attempt.id);

          localStorage.setItem(
            ATTEMPT_STORAGE_KEY,
            currentAttemptId
          );

          setAttemptId(currentAttemptId);
        } else {
          setAttemptId(currentAttemptId);
        }
      } catch (err) {
        console.error(
          "Failed to initialize assessment:",
          err
        );

        setError(
          "Unable to load the assessment. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    initializeAssessment();
  }, []);

  // =========================================================
  // SAVE ANSWERS LOCALLY
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      ANSWERS_STORAGE_KEY,
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

  if (error || !assessment || !attemptId) {
    return (
      <div className="questionnaire-page">
        <main className="questionnaire-main">
          <div className="assessment-top">
            <div>
              <p className="assessment-label">
                NeuroMatrix
              </p>

              <h1>Unable to Load Assessment</h1>

              <p>
                {error ||
                  "Unable to create assessment attempt."}
              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }
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
  // FLATTEN QUESTIONS
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

  const selectAnswer = async (
    questionId,
    optionId
  ) => {
    // Update UI immediately
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionId,
    }));

    // Save to Django
    try {
      setSavingQuestion(questionId);

      await saveResponse(
        attemptId,
        questionId,
        optionId
      );
    } catch (err) {
      console.error(
        "Failed to save response:",
        err
      );

      setError(
        "Your answer could not be saved. Please try again."
      );
    } finally {
      setSavingQuestion(null);
    }
  };

  // =========================================================
  // CURRENT PAGE ANSWERS
  // =========================================================

  const answeredOnCurrentPage =
    visibleQuestions.filter(
      (question) =>
        answers[question.id] !== undefined
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

  const submitAssessment = async () => {
    if (
      Object.keys(answers).length !==
      questions.length
    ) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await completeAttempt(attemptId);

      // Clear local assessment state
      localStorage.removeItem(
        ANSWERS_STORAGE_KEY
      );

      localStorage.removeItem(
        ATTEMPT_STORAGE_KEY
      );

      navigate("/assessment/completed");
    } catch (err) {
      console.error(
        "Failed to complete assessment:",
        err
      );

      setError(
        "Unable to submit the assessment. Please try again."
      );

      setSubmitting(false);
    }
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

      {/* HEADER */}

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

      {/* MAIN */}

      <main className="questionnaire-main">

        {/* HEADER */}

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

        {/* PROGRESS */}

        <div className="question-progress">

          <div
            className="question-progress-bar"
            style={{
              width: `${overallProgress}%`,
            }}
          />

        </div>

        {/* SECTION INFORMATION */}

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

        {/* QUESTIONS */}

        <div className="question-list">

          {visibleQuestions.map(
            (question, index) => {

              const questionNumber =
                startIndex + index + 1;

              const selectedAnswer =
                answers[question.id];

              const isSaving =
                savingQuestion ===
                question.id;

              return (
                <section
                  className="scroll-question-card"
                  key={question.id}
                >

                  {/* QUESTION HEADER */}

                  <div className="scroll-question-header">

                    <span className="scroll-question-number">
                      {String(
                        questionNumber
                      ).padStart(2, "0")}
                    </span>

                    <span className="question-status">

                      {isSaving
                        ? "Saving..."
                        : selectedAnswer !==
                          undefined
                        ? "Answered"
                        : "Not answered"}

                    </span>

                  </div>

                  {/* QUESTION */}

                  <div className="scroll-question-content">

                    <p>
                      How accurately does this
                      statement describe you?
                    </p>

                    <h2>
                      {question.text}
                    </h2>

                  </div>

                  {/* OPTIONS */}

                  <div className="scroll-likert">

                    {question.options.map(
                      (option) => {

                        const isSelected =
                          selectedAnswer ===
                          option.id;

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
                                option.id
                              )
                            }
                            disabled={
                              isSaving
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

        {/* NAVIGATION */}

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
                  questions.length ||
                submitting
              }
            >
              {submitting
                ? "Submitting..."
                : "Submit Assessment"}

              {!submitting && (
                <span>✓</span>
              )}
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

        {/* ERROR */}

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {/* FOOTER */}

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