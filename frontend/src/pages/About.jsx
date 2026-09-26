import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="about-page">

      {/* ================= NAVBAR ================= */}

      <Navbar />


      {/* ================= HERO ================= */}

      <main>

        <section className="about-hero">

          <div className="about-hero-left">

            <span className="about-kicker">
              NEUROMATRIX / ABOUT
            </span>

            <h1>
              Guidance built
              <br />
              around <em>you.</em>
            </h1>

          </div>


          <div className="about-hero-right">

            <p>
              NeuroMatrix Pathways brings together psychological
              assessment, career guidance, and thoughtful
              self-reflection to help students understand their
              possibilities.
            </p>

          </div>

        </section>


        {/* ================= FOUNDER ================= */}

        <section className="about-founder">

          <div className="about-founder-image">

            {/* 
              Put the existing Dr. Seema Wagh image here:

              frontend/public/images/seema-wagh.jpg
            */}

            <img
              src="/images/seema-wagh.jpg"
              alt="Dr. Seema Wagh"
            />

          </div>


          <div className="about-founder-content">

            <span className="about-label">
              FOUNDER &amp; CAREER MENTOR
            </span>

            <h2>
              About Dr. Seema Wagh
            </h2>

            <div className="about-line" />


            <p>
              Her academic achievements reflect both excellence
              and dedication. She holds an M.Sc. in Zoology from
              NMU, where she was awarded a Gold Medal, along with
              qualifications including M.A. in Psychology, D.Lit.,
              M.Phil., B.Ed., and a Diploma in Psychological
              Assessment.
            </p>


            <p>
              She has also pursued specialized training in Career
              and Educational Counselling and psychological
              assessment to further strengthen her expertise in
              student guidance and counselling psychology.
            </p>


            <div className="about-highlight">

              <span>
                ACADEMIC EXCELLENCE
              </span>

              <strong>
                Gold Medalist
              </strong>

              <p>
                Psychology Expert&nbsp; · &nbsp;Career Counsellor
                &nbsp; · &nbsp;Educational Mentor
              </p>

            </div>

          </div>

        </section>


        {/* ================= APPROACH ================= */}

        <section className="about-approach">

          <div className="about-section-heading">

            <span>
              01 / OUR APPROACH
            </span>

            <h2>
              More than a result.
              <br />
              <em>A clearer conversation.</em>
            </h2>

          </div>


          <div className="about-approach-copy">

            <p>
              Choosing a stream, course, or career can feel like
              a decision that has to be made perfectly. Our approach
              starts somewhere different.
            </p>

            <p>
              We create space for students to understand their
              interests, strengths, preferences, and questions
              before turning those reflections into possible
              directions.
            </p>

          </div>

        </section>


        {/* ================= THREE PRINCIPLES ================= */}

        <section className="about-principles">

          <article>

            <span>01</span>

            <h3>
              UNDERSTAND
            </h3>

            <p>
              Begin by understanding your own patterns,
              interests, preferences, and strengths.
            </p>

          </article>


          <article>

            <span>02</span>

            <h3>
              EXPLORE
            </h3>

            <p>
              Look beyond familiar choices and explore
              academic and career possibilities with context.
            </p>

          </article>


          <article>

            <span>03</span>

            <h3>
              MOVE FORWARD
            </h3>

            <p>
              Turn reflection into practical next steps
              that you can actually explore.
            </p>

          </article>

        </section>


        {/* ================= CREDENTIALS ================= */}

        <section className="about-credentials">

          <div>

            <span>
              02 / BACKGROUND
            </span>

            <h2>
              A multidisciplinary
              <br />
              <em>perspective.</em>
            </h2>

          </div>


          <div className="credentials-list">

            <div>
              <span>ACADEMIC</span>
              <strong>
                M.Sc. · M.A. Psychology · D.Lit.
              </strong>
            </div>

            <div>
              <span>ADDITIONAL</span>
              <strong>
                M.Phil. · B.Ed.
              </strong>
            </div>

            <div>
              <span>ASSESSMENT</span>
              <strong>
                Diploma in Psychological Assessment
              </strong>
            </div>

            <div>
              <span>COUNSELLING</span>
              <strong>
                Career &amp; Educational Counselling Training
              </strong>
            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="about-cta">

          <div>

            <span>
              YOUR NEXT STEP
            </span>

            <h2>
              Understanding yourself
              <br />
              is a good <em>place to start.</em>
            </h2>

          </div>


          <div className="about-cta-actions">

            <Link to="/signup">
              START ASSESSMENT →
            </Link>

            <Link to="/contact">
              TALK TO US →
            </Link>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="about-footer">

        <Link
          to="/"
          className="about-footer-brand"
        >
          NEUROMATRIX PATHWAYS
        </Link>


        <div>

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


        <span>
          © {new Date().getFullYear()}
        </span>

      </footer>

    </div>
  );
}

export default About;