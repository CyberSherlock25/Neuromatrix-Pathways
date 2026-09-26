import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Mark() {
  return (
    <span className="editorial-mark" aria-hidden="true">
      <i />
    </span>
  );
}

export default function Home() {
  return (
    <div className="editorial-page home-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <Navbar />


      {/* =====================================================
          LANDING HERO
          ===================================================== */}

      <main>

        <section className="landing-hero">

          {/* LEFT CONTENT */}

          <div className="landing-hero-content">

            <p className="editorial-eyebrow">
              ASSESSMENT <b>•</b> CLARITY <b>•</b> SELF-DISCOVERY
            </p>


            <h1>
              Understand
              <br />
              your strengths.
              <br />
              <em>Choose your direction.</em>
            </h1>


            <p className="landing-description">
              NeuroMatrix Pathways helps students turn honest
              self-reflection into evidence-informed academic
              and career possibilities.
            </p>


            <div className="landing-actions">

              <Link
                to="/signup"
                className="editorial-button editorial-button-dark"
              >
                START YOUR ASSESSMENT
                <span>→</span>
              </Link>


              <Link
                to="/about"
                className="editorial-button editorial-button-outline"
              >
                DISCOVER NEUROMATRIX
              </Link>

            </div>


            <div className="editorial-trust">

              <span>
                ◉ EVIDENCE-INFORMED
              </span>

              <i>•</i>

              <span>
                ◇ STUDENT-FIRST
              </span>

              <i>•</i>

              <span>
                ◌ PRIVATE &amp; SECURE
              </span>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="landing-hero-visual">

            <div className="landing-visual-card">

              <span className="landing-visual-label">
                A CLEARER WAY FORWARD
              </span>


              <div className="landing-orbit orbit-one" />

              <div className="landing-orbit orbit-two" />

              <div className="landing-orbit orbit-three" />


              <div className="landing-core">

                <Mark />

                <strong>
                  YOUR
                  <br />
                  <em>PATH</em>
                </strong>

              </div>

            </div>


            <div className="landing-floating-card">

              <Mark />

              <div>

                <strong>
                  Personalized &amp; secure
                </strong>

                <small>
                  Your responses help shape your individual insight.
                </small>

              </div>

              <span>
                DATA PRIVACY
              </span>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          SMALL FOOTER
          ===================================================== */}

      <footer className="landing-footer">

        <div className="landing-footer-brand">

          <Link
            to="/"
            className="editorial-brand"
          >

            <Mark />

            <span>

              <strong>
                NEUROMATRIX
              </strong>

              <small>
                PATHWAYS · STUDENT ASSESSMENT PLATFORM
              </small>

            </span>

          </Link>

        </div>


        <div className="landing-footer-links">

          <Link to="/about">
            About
          </Link>

          <Link to="/why-counselling">
            Why Counselling
          </Link>

          <Link to="/insights">
            Insights
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        <div className="landing-footer-copy">

          <span>
            © {new Date().getFullYear()} NeuroMatrix Pathways
          </span>

        </div>

      </footer>

    </div>
  );
}