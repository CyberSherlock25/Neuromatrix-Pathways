import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();

  /*
   * Keep the original landing page exactly as it is.
   *
   * Only the destination of assessment buttons changes:
   *
   * Logged out  -> Signup
   * Logged in   -> Actual assessment questions
   */
  const assessmentPath = isAuthenticated
    ? "/assessment/questions"
    : "/signup";

  return (
    <div className="nm-home">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="landing-hero">
        <div className="landing-hero-content">

          <span className="editorial-eyebrow">
            🧠 ASSESSMENT • CLARITY • SELF-DISCOVERY
          </span>

          <h1>
            Understand your strengths.
            <br />
            <em>Choose your direction.</em>
          </h1>

          <p className="landing-description">
            NeuroMatrix Pathways helps students turn honest
            self-reflection into clearer academic and career
            possibilities.
          </p>

          <div className="landing-actions">

            <Link
              to={assessmentPath}
              className="nm-button nm-button-primary"
            >
              START YOUR ASSESSMENT →
            </Link>

            <Link
              to="/about"
              className="nm-button nm-button-outline"
            >
              DISCOVER NEUROMATRIX
            </Link>

          </div>

          <div className="editorial-trust">

            <span>🔬 EVIDENCE-INFORMED</span>

            <span>•</span>

            <span>🎓 STUDENT-FIRST</span>

            <span>•</span>

            <span>🔒 PRIVATE &amp; SECURE</span>

          </div>

        </div>


        <div className="landing-hero-visual">

          <div className="landing-visual-card">

            <span className="landing-visual-label">
              YOUR PATHWAY
            </span>

            <div className="landing-orbit orbit-one" />
            <div className="landing-orbit orbit-two" />
            <div className="landing-orbit orbit-three" />

            <div className="landing-core">

              <span className="editorial-mark">
                ✦
              </span>

              <strong>
                NEURO
                <br />
                <em>MATRIX</em>
              </strong>

            </div>

          </div>


          <div className="landing-floating-card">

            <span className="nm-card-icon">
              🧭
            </span>

            <div>
              <strong>
                A clearer direction
              </strong>

              <small>
                Discover what fits your interests,
                strengths and aspirations.
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY NEUROMATRIX ================= */}

      <section className="home-understanding nm-pattern">

        <div className="home-section-heading">

          <div>

            <span>
              🧭 WHY NEUROMATRIX
            </span>

            <h2>
              Your next step starts with
              <br />
              <em>understanding.</em>
            </h2>

          </div>

          <p>
            Choosing what comes next can feel overwhelming.
            NeuroMatrix gives students a structured space to
            pause, reflect and understand themselves before
            making important academic and career decisions.
          </p>

        </div>


        <div className="home-feature-grid">

          <article className="nm-card home-feature-card">

            <div className="nm-card-icon">
              🧭
            </div>

            <h3>
              Find Your Direction
            </h3>

            <p>
              Turn uncertainty into a clearer understanding
              of possible academic and career pathways.
            </p>

          </article>


          <article className="nm-card home-feature-card">

            <div className="nm-card-icon">
              🧠
            </div>

            <h3>
              Understand Yourself
            </h3>

            <p>
              Reflect on your interests, strengths,
              preferences and learning patterns.
            </p>

          </article>


          <article className="nm-card home-feature-card">

            <div className="nm-card-icon">
              🚀
            </div>

            <h3>
              Plan Your Next Step
            </h3>

            <p>
              Use your insights as a starting point for
              meaningful conversations and decisions.
            </p>

          </article>

        </div>

      </section>


      {/* ================= ASSESSMENTS ================= */}

      <section className="home-assessments">

        <div className="home-section-heading">

          <div>

            <span>
              🎯 ASSESSMENTS
            </span>

            <h2>
              Explore where your
              <br />
              <em>strengths can lead.</em>
            </h2>

          </div>

          <p>
            Start with an assessment designed around
            reflection, interests and personal patterns.
          </p>

        </div>


        <div className="home-assessment-grid">

          <article className="nm-card home-assessment-card">

            <div className="nm-card-icon">
              🧠
            </div>

            <h3>
              Science Stream Fit
            </h3>

            <p>
              Explore your curiosity, analytical thinking
              and problem-solving style.
            </p>

            <Link to={assessmentPath}>
              EXPLORE <span>→</span>
            </Link>

          </article>


          <article className="nm-card home-assessment-card">

            <div className="nm-card-icon">
              📊
            </div>

            <h3>
              Commerce Stream Fit
            </h3>

            <p>
              Understand how your strengths, interests
              and people skills connect.
            </p>

            <Link to={assessmentPath}>
              EXPLORE <span>→</span>
            </Link>

          </article>


          <article className="nm-card home-assessment-card">

            <div className="nm-card-icon">
              ⚙️
            </div>

            <h3>
              Engineering Pathway
            </h3>

            <p>
              Explore systems thinking, persistence
              and your approach to solving problems.
            </p>

            <Link to={assessmentPath}>
              EXPLORE <span>→</span>
            </Link>

          </article>


          <article className="nm-card home-assessment-card">

            <div className="nm-card-icon">
              🎨
            </div>

            <h3>
              Creative Pathway
            </h3>

            <p>
              Discover how imagination, visual thinking
              and creativity can shape your direction.
            </p>

            <Link to={assessmentPath}>
              EXPLORE <span>→</span>
            </Link>

          </article>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="home-process nm-pattern">

        <div className="home-section-heading">

          <div>

            <span>
              ✨ HOW IT WORKS
            </span>

            <h2>
              Simple steps.
              <br />
              <em>Meaningful insight.</em>
            </h2>

          </div>

          <p>
            A simple journey from reflection to exploration
            and practical next steps.
          </p>

        </div>


        <div className="home-process-grid">

          <article className="home-process-card">

            <div className="home-process-icon">
              📝
            </div>

            <div>

              <span>
                REFLECT
              </span>

              <h3>
                Start with yourself.
              </h3>

              <p>
                Answer thoughtfully designed questions
                based on your experiences and preferences.
              </p>

            </div>

          </article>


          <article className="home-process-card">

            <div className="home-process-icon">
              🧠
            </div>

            <div>

              <span>
                UNDERSTAND
              </span>

              <h3>
                Recognise your patterns.
              </h3>

              <p>
                Identify patterns in your interests,
                preferences and personal strengths.
              </p>

            </div>

          </article>


          <article className="home-process-card">

            <div className="home-process-icon">
              🚀
            </div>

            <div>

              <span>
                EXPLORE
              </span>

              <h3>
                Look ahead with clarity.
              </h3>

              <p>
                Use your insights to explore possible
                academic and career directions.
              </p>

            </div>

          </article>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-final-cta">

        <div>

          <span>
            🌱 YOUR NEXT STEP
          </span>

          <h2>
            Start with
            <br />
            <em>curiosity.</em>
          </h2>

          <p>
            You don't need to have everything figured out.
            Start by understanding yourself.
          </p>

        </div>

        <div className="home-final-actions">

          <Link
            to={assessmentPath}
            className="nm-button nm-button-primary"
          >
            START YOUR ASSESSMENT →
          </Link>

          <Link
            to="/contact"
            className="nm-button nm-button-outline"
          >
            TALK TO US
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="landing-footer">

        <Link
          to="/"
          className="editorial-brand"
        >
          NEUROMATRIX PATHWAYS
        </Link>


        <div className="landing-footer-links">

          <Link to="/about">
            ABOUT
          </Link>

          <Link to="/why-counselling">
            WHY COUNSELLING
          </Link>

          <Link to="/insights">
            INSIGHTS
          </Link>

          <Link to="/services">
            SERVICES
          </Link>

          <Link to="/contact">
            CONTACT
          </Link>

        </div>


        <span className="landing-footer-copy">
          © {new Date().getFullYear()} NeuroMatrix Pathways
        </span>

      </footer>

    </div>
  );
}

export default Home;