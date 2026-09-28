import { Link } from "react-router-dom";
import "../styles/editorial.css";
import Navbar from "../components/Navbar";
function Contact() {
  return (
    <div className="contact-page">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="contact-hero">
        <div className="contact-container">

          <div className="contact-eyebrow">
            NEUROMATRIX PATHWAYS
          </div>

          <h1>
            Let’s start a
            <br />
            <em>conversation.</em>
          </h1>

          <p className="contact-intro">
            Whether you are a student exploring your next step, a parent
            looking for guidance, or someone who would like to learn more
            about NeuroMatrix Pathways, we are here to help.
          </p>

        </div>
      </section>


      {/* ================= CONTACT CONTENT ================= */}
      <section className="contact-section">
        <div className="contact-container">

          <div className="contact-grid">

            {/* LEFT SIDE */}
            <div className="contact-info">

              <p className="contact-label">
                GET IN TOUCH
              </p>

              <h2>
                We would be happy
                <br />
                to hear from you.
              </h2>

              <p className="contact-description">
                Reach out to us for information about student assessments,
                career guidance, counselling, or NeuroMatrix Pathways.
              </p>


              {/* EMAIL */}
              <a
                href="mailto:neuromatrixpathways@gmail.com"
                className="contact-card"
              >
                <div className="contact-icon">
                  @
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    neuromatrixpathways@gmail.com
                  </strong>
                </div>

                <b>→</b>
              </a>


              {/* PHONE */}
              <a
                href="tel:+919404211197"
                className="contact-card"
              >
                <div className="contact-icon">
                  ☎
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    +91 94042 11197
                  </strong>
                </div>

                <b>→</b>
              </a>


              {/* ADDRESS */}
              <div className="contact-card contact-address">
                <div className="contact-icon">
                  ⌖
                </div>

                <div>
                  <span>Address</span>

                  <strong>
                    2nd Avenue, Serene Meadows,
                    <br />
                    Gangapur Road,
                    <br />
                    Nashik, Maharashtra -
                    <br />
                    422013
                  </strong>
                </div>
              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="contact-form-wrapper">

              <div className="contact-form-header">
                <p>CONTACT NEUROMATRIX</p>

                <h3>
                  How can we
                  <br />
                  help you?
                </h3>
              </div>


              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();

                  const form = e.currentTarget;
                  const name = form.name.value;
                  const email = form.email.value;
                  const message = form.message.value;

                  const subject = encodeURIComponent(
                    `NeuroMatrix Contact — ${name}`
                  );

                  const body = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                  );

                  window.location.href =
                    `mailto:neuromatrixpathways@gmail.com?subject=${subject}&body=${body}`;
                }}
              >

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label htmlFor="name">
                      YOUR NAME
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>


                  <div className="contact-field">
                    <label htmlFor="email">
                      EMAIL ADDRESS
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                </div>


                <div className="contact-field">
                  <label htmlFor="message">
                    YOUR MESSAGE
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>


                <button
                  type="submit"
                  className="contact-submit"
                >
                  SEND MESSAGE
                  <span>→</span>
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="contact-bottom">
        <div className="contact-container">

          <div>
            <p className="contact-eyebrow">
              YOUR NEXT STEP
            </p>

            <h2>
              Ready to explore
              <br />
              <em>your pathway?</em>
            </h2>
          </div>

          <div className="contact-bottom-actions">

            <Link
              to="/signup"
              className="contact-cta-primary"
            >
              START ASSESSMENT
              <span>→</span>
            </Link>

            <Link
              to="/about"
              className="contact-cta-secondary"
            >
              LEARN ABOUT US
            </Link>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="contact-footer">

        <div className="contact-container">

          <div className="contact-footer-brand">
            <strong>NEUROMATRIX</strong>
            <span>PATHWAYS · STUDENT ASSESSMENT PLATFORM</span>
          </div>

          <div className="contact-footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
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

        </div>

      </footer>

    </div>
  );
}

export default Contact;