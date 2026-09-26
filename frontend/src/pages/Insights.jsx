import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const assessments = [
  {
    number: "01",
    title: "Map Your Profile",
    tag: "DISCOVER",
    description:
      "Understand your interests, strengths, learning preferences, and the context behind your academic questions.",
    details: ["INTERESTS", "STRENGTHS", "LEARNING STYLE"],
  },
  {
    number: "02",
    title: "Explore Through Assessment",
    tag: "ASSESS",
    description:
      "Respond to structured statements designed to help you recognise patterns in how you think, work, and make decisions.",
    details: ["50 QUESTIONS", "LIKERT SCALE", "STUDENT-FIRST"],
  },
  {
    number: "03",
    title: "Chart Your Pathway",
    tag: "REFLECT",
    description:
      "Use the patterns from your assessment as a starting point for exploring academic and career possibilities.",
    details: ["PERSONAL REPORT", "PATHWAYS", "NEXT STEPS"],
  },
];

const insights = [
  {
    type: "STUDY",
    title: "Build a study rhythm that works for you.",
  },
  {
    type: "DECISION",
    title: "Choose with curiosity instead of pressure.",
  },
  {
    type: "WELLBEING",
    title: "Make space around academic uncertainty.",
  },
];

function Mark() {
  return (
    <span className="insights-mark" aria-hidden="true">
      <span />
    </span>
  );
}

export default function Insights() {
  const [activeAssessment, setActiveAssessment] = useState(0);
  const [activeInsight, setActiveInsight] = useState(0);

  const assessment = assessments[activeAssessment];

  return (
    <div className="insights-page">

      {/* ================= NAVBAR ================= */}

      <Navbar />


      <main>

        {/* ================= HERO ================= */}

        <section className="insights-simple-hero">

          <div>

            <span className="insights-kicker">
              NEUROMATRIX / INSIGHTS
            </span>

            <h1>
              Understand your
              <br />
              <em>next move.</em>
            </h1>

          </div>

          <div className="insights-hero-side">

            <p>
              A simple framework for understanding yourself,
              exploring possibilities, and moving toward a clearer
              academic direction.
            </p>

            <Link to="/services">
              EXPLORE SERVICES →
            </Link>

          </div>

        </section>


        {/* ================= ASSESSMENT ================= */}

        <section className="insights-assessment">

          <div className="section-heading">

            <div>

              <span>
                01 / METHODOLOGY
              </span>

              <h2>
                A framework for
                <br />
                <em>meaningful movement.</em>
              </h2>

            </div>

            <p>
              Explore each stage of the NeuroMatrix process.
              Select a step to see how it works.
            </p>

          </div>


          <div className="assessment-layout">

            {/* LEFT TABS */}

            <div className="assessment-tabs">

              {assessments.map((item, index) => (

                <button
                  key={item.number}
                  type="button"
                  className={
                    activeAssessment === index
                      ? "assessment-tab active"
                      : "assessment-tab"
                  }
                  onClick={() => setActiveAssessment(index)}
                >

                  <span>
                    {item.number}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <b>
                    {activeAssessment === index ? "−" : "+"}
                  </b>

                </button>

              ))}

            </div>


            {/* RIGHT DETAIL */}

            <div className="assessment-detail">

              <div className="assessment-detail-top">

                <span>
                  {assessment.tag}
                </span>

                <span>
                  STEP {assessment.number}
                </span>

              </div>


              <Mark />


              <h3>
                {assessment.title}
              </h3>


              <p>
                {assessment.description}
              </p>


              <div className="assessment-details">

                {assessment.details.map((detail) => (

                  <span key={detail}>
                    {detail}
                  </span>

                ))}

              </div>


              <Link to="/signup">
                START ASSESSMENT →
              </Link>

            </div>

          </div>

        </section>


        {/* ================= TRAIT ================= */}

        <section className="trait-strip">

          <div className="trait-number">
            02
          </div>

          <div className="trait-main">

            <span>
              TRAIT INSIGHT
            </span>

            <h2>
              Your pattern is a
              <br />
              <em>place to begin.</em>
            </h2>

          </div>

          <div className="trait-copy">

            <p>
              Your responses are not a verdict about who you are.
              They are a starting point for reflection and better
              conversations about what comes next.
            </p>

            <div className="trait-prompt">

              <small>
                REFLECTION PROMPT
              </small>

              <strong>
                What kind of problem keeps your attention?
              </strong>

            </div>

          </div>

        </section>


        {/* ================= INSIGHTS ================= */}

        <section className="mini-insights">

          <div className="section-heading">

            <div>

              <span>
                03 / INSIGHTS
              </span>

              <h2>
                Ideas for your
                <br />
                <em>next conversation.</em>
              </h2>

            </div>

            <div className="insight-counter">
              0{activeInsight + 1} / 0{insights.length}
            </div>

          </div>


          <div className="insight-interactive">

            <div className="insight-list">

              {insights.map((item, index) => (

                <button
                  key={item.title}
                  type="button"
                  className={
                    activeInsight === index
                      ? "insight-item active"
                      : "insight-item"
                  }
                  onClick={() => setActiveInsight(index)}
                >

                  <span>
                    {item.type}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <b>
                    →
                  </b>

                </button>

              ))}

            </div>


            <div className="insight-preview">

              <span>
                {insights[activeInsight].type}
              </span>

              <h3>
                {insights[activeInsight].title}
              </h3>

              <Link to="/contact">
                DISCUSS THIS WITH US →
              </Link>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="insights-cta">

          <div>

            <span>
              YOUR NEXT STEP
            </span>

            <h2>
              Start with
              <br />
              <em>curiosity.</em>
            </h2>

          </div>

          <Link to="/signup">
            START YOUR ASSESSMENT →
          </Link>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="insights-footer">

        <Link to="/">
          NEUROMATRIX PATHWAYS
        </Link>

        <div>

          <Link to="/about">
            ABOUT
          </Link>

          <Link to="/why-counselling">
            WHY COUNSELLING
          </Link>

          <Link to="/services">
            SERVICES
          </Link>

          <Link to="/contact">
            CONTACT
          </Link>

        </div>

        <span>
          © {new Date().getFullYear()}
        </span>

      </footer>

    </div>
  );
}