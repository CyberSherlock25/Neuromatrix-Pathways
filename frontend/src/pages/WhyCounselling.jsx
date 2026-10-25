import Navbar from "../components/Navbar";
import "../styles/editorial.css";

const counsellingReasons = [
  {
    number: "01",
    icon: "🌐",
    title: "Creating Awareness About Emerging Career Opportunities",
    text:
      "The professional world is constantly evolving, with new industries, technologies, and opportunities emerging every year. Career counselling broadens students’ perspectives and introduces them to future-focused career pathways.",
    tag: "CAREER AWARENESS",
  },
  {
    number: "02",
    icon: "🎓",
    title: "Aligning Education with Future Employability",
    text:
      "Students need more than academic qualifications to succeed in the modern world. Career guidance helps individuals understand the skills, competencies, and preparedness required for future employability and career growth.",
    tag: "FUTURE READINESS",
  },
  {
    number: "03",
    icon: "🧭",
    title: "Reducing Career Confusion and Anxiety",
    text:
      "Educational and career-related decisions can feel overwhelming for both students and parents. Structured guidance helps reduce uncertainty and enables students to move forward with greater confidence and clarity.",
    tag: "CLARITY & CONFIDENCE",
  },
  {
    number: "04",
    icon: "⚡",
    title: "Supporting Skill-Based and Personalized Learning",
    text:
      "In alignment with the vision of NEP 2020, career counselling encourages students to pursue pathways based on their individual strengths, interests, and capabilities rather than following traditional expectations alone.",
    tag: "PERSONALIZED PATHWAYS",
  },
  {
    number: "05",
    icon: "🚀",
    title: "Building Confidence and Long-Term Direction",
    text:
      "Career counselling helps students build confidence in their choices while developing a clear roadmap for academic growth, career planning, and future success.",
    tag: "LONG-TERM DIRECTION",
  },
  {
    number: "06",
    icon: "✨",
    title: "Encouraging Fulfilling and Meaningful Careers",
    text:
      "A successful career should provide not only financial stability but also satisfaction, purpose, and personal fulfilment. Career counselling helps individuals pursue opportunities that align with their values and aspirations.",
    tag: "PURPOSE & FULFILMENT",
  },
];

const globalDestinations = [
  "🇮🇳 INDIA",
  "🇺🇸 USA",
  "🇬🇧 UK",
  "🇨🇦 CANADA",
  "🇦🇺 AUSTRALIA",
  "🇩🇪 GERMANY",
  "🇸🇬 SINGAPORE",
  "🇦🇪 UAE",
  "🇳🇿 NEW ZEALAND",
];

export default function WhyCounselling() {
  return (
    <div className="why-page">
      <Navbar />

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="why-hero">

          <div className="why-hero-overlay" />

          <div className="why-hero-content">

            <div className="why-hero-copy">

              <span className="why-eyebrow">
                NEUROMATRIX / WHY COUNSELLING
              </span>

              <h1>
                Your future deserves
                <br />
                more than a <em>guess.</em>
              </h1>

              <p>
                Career counselling creates a structured space to understand
                your strengths, explore possibilities, and make educational
                decisions with greater clarity.
              </p>

              <div className="why-hero-actions">
                <a href="#reasons" className="why-primary-button">
                  EXPLORE WHY IT MATTERS
                  <span>↓</span>
                </a>

                <a href="/contact" className="why-secondary-button">
                  TALK TO A COUNSELLOR
                  <span>→</span>
                </a>
              </div>

            </div>

            <div className="why-hero-orbit">

              <div className="why-orbit-ring ring-one" />
              <div className="why-orbit-ring ring-two" />
              <div className="why-orbit-ring ring-three" />

              <div className="why-orbit-core">
                <span>YOUR</span>
                <strong>PATH</strong>
                <small>STARTS WITH<br />UNDERSTANDING</small>
              </div>

            </div>

          </div>

          <div className="why-hero-bottom">
            <span>CLARITY</span>
            <i>•</i>
            <span>EXPLORATION</span>
            <i>•</i>
            <span>DIRECTION</span>
          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="why-intro">

          <div className="why-intro-heading">

            <span className="why-section-label">
              THE NEED FOR CAREER COUNSELLING
            </span>

            <h2>
              Make the decision
              <br />
              <em>with context.</em>
            </h2>

          </div>

          <div className="why-intro-content">

            <p>
              In today’s fast-changing educational and professional
              landscape, students are exposed to countless career choices,
              increasing competition, evolving industries, and constant
              external pressure.
            </p>

            <p>
              Making the right educational and career decisions without
              proper guidance can often lead to confusion, dissatisfaction,
              and uncertainty about the future.
            </p>

            <div className="why-quote-card">

              <span>✦</span>

              <p>
                Career counselling helps individuals understand themselves
                better and make informed choices based on their unique
                strengths, interests, and aspirations.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            SIX REASONS
        ===================================================== */}

        <section
          id="reasons"
          className="why-reasons"
        >

          <div className="why-reasons-heading">

            <div>
              <span className="why-section-label">
                WHY IT MATTERS
              </span>

              <h2>
                Six reasons to
                <br />
                <em>look deeper.</em>
              </h2>
            </div>

            <p>
              Career guidance is not about choosing a single answer.
              It is about understanding the factors that can shape
              a meaningful direction.
            </p>

          </div>


          <div className="why-card-grid">

            {counsellingReasons.map((reason) => (

              <article
                className="why-reason-card"
                key={reason.number}
              >

                <div className="why-card-top">

                  <span className="why-card-number">
                    {reason.number}
                  </span>

                  <span className="why-card-icon">
                    {reason.icon}
                  </span>

                </div>

                <div className="why-card-body">

                  <span className="why-card-tag">
                    {reason.tag}
                  </span>

                  <h3>
                    {reason.title}
                  </h3>

                  <p>
                    {reason.text}
                  </p>

                </div>

                <div className="why-card-arrow">
                  ↗
                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =====================================================
            REFLECTION SECTION
        ===================================================== */}

        <section className="why-reflection">

          <div className="why-reflection-visual">

            <div className="reflection-glow" />

            <div className="reflection-circle circle-one" />
            <div className="reflection-circle circle-two" />
            <div className="reflection-circle circle-three" />

            <span className="reflection-word">
              EXPLORE
            </span>

          </div>


          <div className="why-reflection-content">

            <span className="why-section-label">
              A DIFFERENT STARTING POINT
            </span>

            <h2>
              Don't start with
              <br />
              <em>“What should I choose?”</em>
            </h2>

            <p>
              Start with better questions.
            </p>

            <div className="why-question-list">

              <div>
                <span>01</span>
                <p>
                  What kind of problems naturally hold your attention?
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  Which strengths do you want to develop further?
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  What kind of future would feel meaningful to you?
                </p>
              </div>

            </div>

          </div>

        </section>





        {/* =====================================================
            INTERNATIONAL STRIP
        ===================================================== */}

        <section className="why-global">

          <div className="why-global-heading">
            <span>
              EDUCATION HAS NO SINGLE BORDER
            </span>

            <p>
              Explore possibilities locally and globally.
            </p>
          </div>

          <div className="why-marquee">

            <div className="why-marquee-track">

              {[...globalDestinations, ...globalDestinations].map(
                (country, index) => (
                  <span key={`${country}-${index}`}>
                    {country}
                  </span>
                )
              )}

            </div>

          </div>

        </section>

      </main>

      <footer className="why-footer">

        <div>
          <strong>NEUROMATRIX</strong>
          <span>PATHWAYS</span>
        </div>

        <p>
          Understand yourself. Explore possibilities. Choose your direction.
        </p>

        <span>
          © {new Date().getFullYear()} NeuroMatrix Pathways
        </span>

      </footer>

    </div>
  );
}