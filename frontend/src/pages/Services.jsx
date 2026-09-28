import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/editorial.css";

const services = [
  {
    number: "01",
    title: "Career Counselling",
    short:
      "Personalised guidance to help students understand their interests, strengths and possible academic or career directions.",
    details: [
      "Understanding interests and strengths",
      "Exploring academic pathways",
      "Career direction and planning",
      "Personalised one-to-one guidance",
    ],
  },
  {
    number: "02",
    title: "Psychological Assessment",
    short:
      "Structured assessment designed to help students understand their patterns, preferences and individual characteristics.",
    details: [
      "Structured psychological assessment",
      "Interest and preference exploration",
      "Understanding individual patterns",
      "Assessment-based discussion",
    ],
  },
  {
    number: "03",
    title: "Educational Guidance",
    short:
      "Support for students navigating important educational decisions and trying to understand which direction fits them.",
    details: [
      "Subject and stream exploration",
      "Academic decision support",
      "Understanding educational options",
      "Planning the next stage",
    ],
  },
  {
    number: "04",
    title: "Student Development",
    short:
      "A reflective approach that helps students develop greater self-awareness and confidence around their decisions.",
    details: [
      "Self-awareness",
      "Strength identification",
      "Decision-making reflection",
      "Personal development",
    ],
  },
];

function Services() {
  const [openService, setOpenService] = useState(null);

  const toggleService = (index) => {
    setOpenService(openService === index ? null : index);
  };

  return (
    <div className="nm-page services-page">

      <Navbar />

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="services-hero">

          <div className="services-hero-inner">

            <div className="services-hero-content">

              <span className="nm-page-kicker">
                NEUROMATRIX / SERVICES
              </span>

              <h1 className="services-hero-title">
                Guidance for
                <br />
                <em>where you are.</em>
              </h1>

              <p className="services-hero-description">
                Thoughtful assessment, counselling and educational
                guidance designed to help students understand
                themselves and move forward with greater clarity.
              </p>

              <div className="services-hero-actions">

                <Link
                  to="/signup"
                  className="nm-button nm-button-primary"
                >
                  START ASSESSMENT
                  <span>→</span>
                </Link>

                <Link
                  to="/contact"
                  className="nm-button nm-button-outline"
                >
                  TALK TO US
                </Link>

              </div>

            </div>


            {/* VISUAL */}

            <div className="services-hero-visual">

              <div className="services-orbit orbit-a" />
              <div className="services-orbit orbit-b" />
              <div className="services-orbit orbit-c" />

              <div className="services-visual-core">

                <span>NM</span>

                <strong>
                  YOUR
                  <br />
                  PATH
                </strong>

              </div>

              <span className="services-visual-note">
                UNDERSTAND · EXPLORE · MOVE FORWARD
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="nm-section services-intro">

          <div className="nm-section-header">

            <div>

              <span className="nm-section-label">
                WHAT WE OFFER
              </span>

              <h2 className="nm-section-title">
                More than an answer.
                <br />
                <em>A clearer direction.</em>
              </h2>

            </div>

            <p className="nm-section-intro">
              Every student arrives with a different question.
              Our services are designed to create space for
              understanding before making important decisions.
            </p>

          </div>

        </section>


        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section className="nm-section services-list-section">

          <div className="services-list">

            {services.map((service, index) => {

              const isOpen = openService === index;

              return (
                <article
                  className={`service-item ${
                    isOpen ? "is-open" : ""
                  }`}
                  key={service.number}
                >

                  <button
                    type="button"
                    className="service-item-header"
                    onClick={() => toggleService(index)}
                    aria-expanded={isOpen}
                  >

                    <span className="service-number">
                      {service.number}
                    </span>

                    <h3>
                      {service.title}
                    </h3>

                    <span className="service-toggle">
                      {isOpen ? "−" : "+"}
                    </span>

                  </button>


                  <div className="service-item-content">

                    <div className="service-item-description">

                      <p>
                        {service.short}
                      </p>

                    </div>


                    <div className="service-details">

                      <span>
                        WHAT'S INCLUDED
                      </span>

                      <ul>
                        {service.details.map((detail) => (
                          <li key={detail}>
                            <span>+</span>
                            {detail}
                          </li>
                        ))}
                      </ul>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section className="nm-section nm-section-soft services-process">

          <div className="nm-section-header">

            <div>

              <span className="nm-section-label">
                THE PROCESS
              </span>

              <h2 className="nm-section-title">
                A thoughtful process
                <br />
                <em>from question to clarity.</em>
              </h2>

            </div>

            <p className="nm-section-intro">
              The goal isn't to tell you who you should become.
              It is to help you understand your possibilities
              well enough to explore them confidently.
            </p>

          </div>


          <div className="services-process-grid">

            <article>

              <span>01</span>

              <h3>
                Understand
              </h3>

              <p>
                Begin with your context, experiences, interests
                and the questions you are trying to answer.
              </p>

            </article>


            <article>

              <span>02</span>

              <h3>
                Assess
              </h3>

              <p>
                Use structured reflection and assessment to
                identify meaningful patterns.
              </p>

            </article>


            <article>

              <span>03</span>

              <h3>
                Explore
              </h3>

              <p>
                Connect what you learn about yourself with
                possible educational and career directions.
              </p>

            </article>


            <article>

              <span>04</span>

              <h3>
                Move Forward
              </h3>

              <p>
                Turn insight into practical next steps that
                you can explore at your own pace.
              </p>

            </article>

          </div>

        </section>


        {/* =====================================================
            ASSESSMENT CTA
        ===================================================== */}

        <section className="services-assessment-section">

          <div className="services-assessment-content">

            <span className="services-cta-label">
              READY TO BEGIN?
            </span>

            <h2>
              Start with
              <br />
              <em>understanding yourself.</em>
            </h2>

            <p>
              Take the first step toward understanding your
              strengths, preferences and possible pathways.
            </p>

          </div>


          <div className="services-assessment-action">

            <Link
              to="/signup"
              className="nm-button nm-button-light"
            >
              START YOUR ASSESSMENT
              <span>→</span>
            </Link>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="nm-footer services-footer">

        <div className="services-footer-top">

          <div>

            <Link
              to="/"
              className="services-footer-brand"
            >
              NEUROMATRIX
              <span>
                PATHWAYS
              </span>
            </Link>

            <p>
              Understand yourself.
              <br />
              Choose your direction.
            </p>

          </div>


          <div className="services-footer-links">

            <span>
              EXPLORE
            </span>

            <Link to="/">
              HOME
            </Link>

            <Link to="/about">
              ABOUT
            </Link>

            <Link to="/why-counselling">
              WHY COUNSELLING
            </Link>

            <Link to="/insights">
              INSIGHTS
            </Link>

            <Link to="/contact">
              CONTACT
            </Link>

          </div>

        </div>


        <div className="services-footer-bottom">

          <span>
            © {new Date().getFullYear()} NeuroMatrix Pathways
          </span>

          <span>
            STUDENT ASSESSMENT &amp; GUIDANCE PLATFORM
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Services;