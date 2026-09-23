import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import grade8 from "../assessments/grade8";
import grade9 from "../assessments/grade9";
import grade10 from "../assessments/grade10";
import grade11 from "../assessments/grade11";
import grade12 from "../assessments/grade12";
import pursuingUG from "../assessments/pursuingUG";
import completedUG from "../assessments/completedUG";

import "../App.css";

const assessments = {
  "8th": grade8,
  "9th": grade9,
  "10th": grade10,
  "11th": grade11,
  "12th": grade12,
  "pursuing-ug": pursuingUG,
  "completed-ug": completedUG,
};

const scaleOptions = [
  {
    value: 1,
    label: "Strongly Agree",
  },
  {
    value: 2,
    label: "Agree",
  },
  {
    value: 3,
    label: "Neutral",
  },
  {
    value: 4,
    label: "Disagree",
  },
  {
    value: 5,
    label: "Strongly Disagree",
  },
];

const QUESTIONS_PER_PAGE = 10;

function Assessment() {
  const navigate = useNavigate();

  /*
    Temporary status.

    Later this will come from:
    logged-in user → profile.status
  */

  const studentStatus = "10th";

  const assessment = assessments[studentStatus];

  const questions = assessment.questions;

  const [currentPage, setCurrentPage] = useState(0);

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(
      "neuromatrix_assessment_answers"
    );

    return savedAnswers
      ? JSON.parse(savedAnswers)
      : {};
  });

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

  const selectAnswer = (questionId, value) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  const answeredOnCurrentPage =
    visibleQuestions.filter(
      (question) => answers[question.id]
    ).length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((previous) => previous + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((previous) => previous - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const submitAssessment = () => {
    console.log("Assessment responses:", answers);

    navigate("/assessment/completed");
  };

  const overallProgress =
    (Object.keys(answers).length / questions.length) * 100;

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
          {Object.keys(answers).length} / {questions.length} answered
        </div>

        <button
          className="exit-assessment"
          onClick={() => navigate("/dashboard")}
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
              {assessment.stage}
            </p>

            <h1>
              Self-Discovery Assessment
            </h1>

          </div>

          <div className="page-counter">
            Section {currentPage + 1} of {totalPages}
          </div>

        </div>


        {/* Overall progress */}

        <div className="question-progress">

          <div
            className="question-progress-bar"
            style={{
              width: `${overallProgress}%`,
            }}
          />

        </div>


        {/* Section information */}

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
            Answer each statement based on how well it
            describes you.
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

                  <div className="scroll-question-header">

                    <span className="scroll-question-number">
                      {String(questionNumber).padStart(2, "0")}
                    </span>

                    <span className="question-status">

                      {selectedAnswer
                        ? "Answered"
                        : "Not answered"}

                    </span>

                  </div>


                  <div className="scroll-question-content">

                    <p>
                      How accurately does this statement
                      describe you?
                    </p>

                    <h2>
                      {question.statement}
                    </h2>

                  </div>


                  {/* Likert */}

                  <div className="scroll-likert">

                    {scaleOptions.map(
                      (option) => {

                        const isSelected =
                          selectedAnswer === option.value;

                        return (
                          <button
                            key={option.value}
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
                              {option.label}
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


          {currentPage === totalPages - 1 ? (

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


        <p className="assessment-footer-note">
          There are no right or wrong answers. Choose the
          response that best represents you.
        </p>

      </main>

    </div>
  );
}

export default Assessment;