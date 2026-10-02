import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/editorial.css";
const insightCards = [
  {
    id: 1,
    icon: "🧭",
    category: "SELF-DISCOVERY",
    title: "Understand before you choose.",
    text:
      "Good academic and career decisions begin with understanding your interests, strengths, preferences, and the kind of environment in which you work best.",
    points: [
      "Know what genuinely interests you",
      "Recognise your natural strengths",
      "Understand your learning preferences",
    ],
  },
  {
    id: 2,
    icon: "💡",
    category: "DECISION MAKING",
    title: "Explore beyond the obvious.",
    text:
      "Students often choose familiar options because they are easier to understand. Exploring different pathways can reveal possibilities that may otherwise remain unnoticed.",
    points: [
      "Look beyond familiar career choices",
      "Compare different academic pathways",
      "Consider your interests alongside opportunities",
    ],
  },
  {
    id: 3,
    icon: "🌱",
    category: "PERSONAL GROWTH",
    title: "Progress does not need to be perfect.",
    text:
      "Your first decision does not have to define your entire future. Reflection, exploration, and informed conversations can help you move forward with greater clarity.",
    points: [
      "Allow yourself to explore",
      "Learn from changing interests",
      "Focus on practical next steps",
    ],
  },
];

function Insights() {
  const [activeInsight, setActiveInsight] = useState(0);

  const activeCard = insightCards[activeInsight];

  return (
    <div className="insights-page">

      {/* ================= NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN ================= */}

      <main>

        {/* ================= HERO ================= */}

        <section className="insights-hero">

          <div className="insights-hero-content">

            <span className="insights-eyebrow">
              NEUROMATRIX / INSIGHTS
            </span>

            <h1>
              Think clearly.
              <br />
              <em>Choose thoughtfully.</em>
            </h1>

            <p>
              Useful perspectives for students navigating academic
              choices, career possibilities, and personal growth.
            </p>

          </div>


          <div className="insights-hero-card">

            <span>💭 A QUESTION TO CONSIDER</span>

            <h3>
              What are you naturally curious about?
            </h3>

            <p>
              Sometimes the questions that keep your attention
              can tell you something important about the direction
              you may want to explore.
            </p>

          </div>

        </section>


        {/* ================= INSIGHT EXPLORER ================= */}

        <section className="insights-explorer">

          <div className="insights-heading">

            <span>
              EXPLORE
            </span>

            <h2>
              A few ideas worth
              <br />
              <em>thinking about.</em>
            </h2>

            <p>
              Select an area to explore a little deeper.
            </p>

          </div>


          <div className="insights-layout">

            {/* ================= TABS ================= */}

            <div className="insights-tabs">

              {insightCards.map((card, index) => (

                <button
                  key={card.id}
                  type="button"
                  className={
                    activeInsight === index
                      ? "insight-tab active"
                      : "insight-tab"
                  }
                  onClick={() => setActiveInsight(index)}
                >

                  <span className="insight-tab-icon">
                    {card.icon}
                  </span>

                  <span className="insight-tab-content">

                    <small>
                      {card.category}
                    </small>

                    <strong>
                      {card.title}
                    </strong>

                  </span>

                  <span className="insight-tab-arrow">
                    →
                  </span>

                </button>

              ))}

            </div>


            {/* ================= ACTIVE CARD ================= */}

            <article className="insight-feature">

              <div className="insight-feature-top">

                <span className="insight-feature-icon">
                  {activeCard.icon}
                </span>

                <span>
                  {activeCard.category}
                </span>

              </div>


              <h3>
                {activeCard.title}
              </h3>


              <p className="insight-feature-description">
                {activeCard.text}
              </p>


              <div className="insight-points">

                {activeCard.points.map((point, index) => (

                  <div
                    className="insight-point"
                    key={point}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <p>
                      {point}
                    </p>

                  </div>

                ))}

              </div>

            </article>

          </div>

        </section>


        {/* ================= REFLECTION ================= */}

        <section className="insights-reflection">

          <div className="reflection-symbol">
            ✦
          </div>

          <div className="reflection-content">

            <span>
              TAKE A MOMENT
            </span>

            <h2>
              Your interests can be
              <br />
              <em>clues, not constraints.</em>
            </h2>

            <p>
              You do not need to have everything figured out.
              Start by noticing what attracts your attention,
              what problems you enjoy solving, and what kind of
              work feels meaningful to you.
            </p>

          </div>


          <div className="reflection-question">

            <span>
              REFLECTION
            </span>

            <strong>
              "What would I enjoy learning about even if nobody
              asked me to?"
            </strong>

          </div>

        </section>


        {/* ================= PRACTICAL INSIGHT ================= */}

        <section className="insights-practical">

          <div>

            <span>
              A SIMPLE START
            </span>

            <h2>
              Turn reflection
              <br />
              into a <em>next step.</em>
            </h2>

          </div>


          <div className="practical-content">

            <p>
              Clarity becomes more useful when it leads to
              something practical. Write down one area that
              interests you and explore it further.
            </p>

            <div className="practical-actions">

              <div>
                <span>01</span>
                <strong>Notice</strong>
                <p>
                  Identify what interests you.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Explore</strong>
                <p>
                  Learn about possible pathways.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Discuss</strong>
                <p>
                  Talk through your options.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="insights-cta">

          <div>

            <span>
              READY TO EXPLORE?
            </span>

            <h2>
              Start with
              <br />
              <em>yourself.</em>
            </h2>

          </div>


          <div className="insights-cta-actions">

            <Link to="/signup">
              START YOUR ASSESSMENT
              <span>→</span>
            </Link>

            <Link to="/contact">
              TALK TO US
              <span>→</span>
            </Link>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="insights-footer">

        <Link
          to="/"
          className="insights-footer-brand"
        >
          NeuroMatrix
          <span>Pathways</span>
        </Link>


        <div className="insights-footer-links">

          <Link to="/about">
            About
          </Link>

          <Link to="/why-counselling">
            Why Counselling
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        <span className="insights-footer-copy">
          © {new Date().getFullYear()} NeuroMatrix Pathways
        </span>

      </footer>

    </div>
  );
}

export default Insights;