import Navbar from "../components/Navbar";
import "../styles/editorial.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      <main className="contact-main">

        {/* ================= HERO ================= */}
        <section className="contact-hero">

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              NEUROMATRIX / CONTACT
            </span>

            <h1>
              Let’s start a
              <br />
              <em>conversation.</em>
            </h1>

            <p>
              Have a question about counselling, assessments, career
              guidance, or our programs? Reach out to the NeuroMatrix
              Pathways team and we’ll help you find the right next step.
            </p>

          </div>

          <div className="contact-hero-decoration">
            <div className="contact-orbit orbit-one"></div>
            <div className="contact-orbit orbit-two"></div>

            <div className="contact-orbit-core">
              <span>NM</span>
            </div>
          </div>

        </section>


        {/* ================= CONTACT CARDS ================= */}
        <section className="contact-information">

          <div className="contact-info-heading">

            <span>GET IN TOUCH</span>

            <h2>
              We’re here to
              <br />
              <em>help.</em>
            </h2>

          </div>


          <div className="contact-cards">

            {/* EMAIL */}
            <a
              href="mailto:neuromatrixpathways@gmail.com"
              className="contact-card"
            >

              <div className="contact-card-icon">
                ✉
              </div>

              <div className="contact-card-content">

                <span className="contact-card-label">
                  EMAIL
                </span>

                <h3>
                  neuromatrixpathways@gmail.com
                </h3>

                <p>
                  Send us your questions, enquiries, or
                  counselling-related queries.
                </p>

              </div>

              <span className="contact-card-arrow">
                ↗
              </span>

            </a>


            {/* PHONE */}
            <a
              href="tel:+919404211197"
              className="contact-card"
            >

              <div className="contact-card-icon">
                ☎
              </div>

              <div className="contact-card-content">

                <span className="contact-card-label">
                  PHONE
                </span>

                <h3>
                  +91 94042 11197
                </h3>

                <p>
                  Connect with our team for guidance and
                  further information.
                </p>

              </div>

              <span className="contact-card-arrow">
                ↗
              </span>

            </a>


            {/* ADDRESS */}
            <div className="contact-card contact-card-address">

              <div className="contact-card-icon">
                📍
              </div>

              <div className="contact-card-content">

                <span className="contact-card-label">
                  VISIT US
                </span>

                <h3>
                  Nashik, Maharashtra
                </h3>

                <p>
                  2nd Avenue, Serene Meadows,
                  <br />
                  Gangapur Road, Nashik,
                  <br />
                  Maharashtra – 422013
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= MESSAGE SECTION ================= */}
        <section className="contact-message">

          <div className="contact-message-inner">

            <div className="contact-message-copy">

              <span>
                HAVE A QUESTION?
              </span>

              <h2>
                Tell us what’s
                <br />
                <em>on your mind.</em>
              </h2>

              <p>
                Whether you’re a student, parent, or simply exploring
                your options, you can reach out to us directly.
              </p>

            </div>


            <div className="contact-message-actions">

              <a
                href="mailto:neuromatrixpathways@gmail.com"
                className="contact-primary-button"
              >
                SEND AN EMAIL
                <span>→</span>
              </a>

              <a
                href="tel:+919404211197"
                className="contact-secondary-button"
              >
                CALL US
                <span>↗</span>
              </a>

            </div>

          </div>

        </section>


        {/* ================= LOCATION ================= */}
        <section className="contact-location">

          <div className="contact-location-top">

            <span>
              OUR LOCATION
            </span>

            <h2>
              Nashik,
              <br />
              <em>Maharashtra.</em>
            </h2>

          </div>


          <div className="contact-location-card">

            <div className="location-pin">
              📍
            </div>

            <div>

              <strong>
                NeuroMatrix Pathways
              </strong>

              <p>
                2nd Avenue, Serene Meadows,
                <br />
                Gangapur Road,
                <br />
                Nashik, Maharashtra – 422013
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="contact-footer">

        <div className="contact-footer-brand">
          <strong>
            NeuroMatrix
          </strong>

          <span>
            Pathways
          </span>
        </div>

        <div className="contact-footer-links">

          <a href="/">
            HOME
          </a>

          <a href="/about">
            ABOUT
          </a>

          <a href="/why-counselling">
            WHY COUNSELLING
          </a>

          <a href="/services">
            SERVICES
          </a>

        </div>

        <span className="contact-footer-copy">
          © {new Date().getFullYear()} NeuroMatrix Pathways
        </span>

      </footer>

    </div>
  );
}