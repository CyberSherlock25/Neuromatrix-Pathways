import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <Link to="/" className="brand">
          <span className="brand-main">NeuroMatrix</span>
          <span className="brand-sub">Pathways</span>
        </Link>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#discover">Discover</a>
          <a href="#about">About</a>

          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/signup" className="nav-get-started">
            Get Started
          </Link>
        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            DISCOVER YOUR POTENTIAL
          </div>

          <h1>
            Understand
            <br />
            <span>Yourself.</span>
            <br />
            Discover Your
            <br />
            <strong>Path.</strong>
          </h1>

          <p className="hero-description">
            NeuroMatrix Pathways helps students understand
            their strengths, interests and preferences through
            structured assessments designed for their stage
            of education.
          </p>

          <div className="hero-actions">

            <Link
              to="/signup"
              className="hero-primary-btn"
            >
              Take Assessment
              <span>→</span>
            </Link>

            <a
              href="#how-it-works"
              className="hero-secondary-btn"
            >
              Learn How It Works
            </a>

          </div>

          <div className="hero-trust">

            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Student-focused</span>
            </div>

            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Structured assessment</span>
            </div>

            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Personalized insights</span>
            </div>

          </div>

        </div>


        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">

          <div className="visual-glow"></div>

          <div className="pathway-orbit orbit-one"></div>
          <div className="pathway-orbit orbit-two"></div>
          <div className="pathway-orbit orbit-three"></div>

          <div className="visual-center">

            <div className="brain-symbol">
              ◈
            </div>

            <span>NEUROMATRIX</span>

            <strong>
              YOUR PATH
            </strong>

          </div>


          <div className="floating-card card-top">

            <div className="mini-icon">✦</div>

            <div>
              <small>DISCOVER</small>
              <strong>Your Strengths</strong>
            </div>

          </div>


          <div className="floating-card card-right">

            <div className="mini-icon">⌁</div>

            <div>
              <small>EXPLORE</small>
              <strong>Your Interests</strong>
            </div>

          </div>


          <div className="floating-card card-bottom">

            <div className="mini-icon">↗</div>

            <div>
              <small>FIND</small>
              <strong>Your Pathways</strong>
            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="section-heading">

          <div className="section-eyebrow">
            THE NEUROMATRIX JOURNEY
          </div>

          <h2>
            A better way to
            <span> understand yourself.</span>
          </h2>

          <p>
            Your journey begins with understanding where
            you are today and discovering possibilities
            for where you could go tomorrow.
          </p>

        </div>


        <div className="journey-grid">

          <div className="journey-card">

            <div className="journey-number">
              01
            </div>

            <div className="journey-icon">
              ◉
            </div>

            <h3>
              Create Your Profile
            </h3>

            <p>
              Tell us about yourself and your current
              stage of education.
            </p>

          </div>


          <div className="journey-card">

            <div className="journey-number">
              02
            </div>

            <div className="journey-icon">
              ◌
            </div>

            <h3>
              Take Your Assessment
            </h3>

            <p>
              Answer carefully designed statements using
              a simple response scale.
            </p>

          </div>


          <div className="journey-card">

            <div className="journey-number">
              03
            </div>

            <div className="journey-icon">
              ↗
            </div>

            <h3>
              Discover Your Path
            </h3>

            <p>
              Gain meaningful insights that can help
              you think about your future.
            </p>

          </div>

        </div>

      </section>


      {/* ================= DISCOVER ================= */}

      <section
        id="discover"
        className="discover-section"
      >

        <div className="discover-content">

          <div className="section-eyebrow">
            BEYOND THE CLASSROOM
          </div>

          <h2>
            You're more than
            <br />
            <span>just your marks.</span>
          </h2>

          <p>
            Every student has a unique combination of
            interests, preferences, strengths and ways
            of thinking.
          </p>

          <p>
            NeuroMatrix Pathways is designed to help you
            explore those dimensions and understand
            yourself more clearly.
          </p>

          <Link
            to="/signup"
            className="discover-btn"
          >
            Begin Your Journey
            <span>→</span>
          </Link>

        </div>


        <div className="discover-visual">

          <div className="dimension dimension-one">
            <span>01</span>
            <strong>Interests</strong>
          </div>

          <div className="dimension dimension-two">
            <span>02</span>
            <strong>Preferences</strong>
          </div>

          <div className="dimension dimension-three">
            <span>03</span>
            <strong>Strengths</strong>
          </div>

          <div className="dimension dimension-four">
            <span>04</span>
            <strong>Personality</strong>
          </div>

          <div className="dimension-center">
            <span>YOU</span>
          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="about-section"
      >

        <div className="about-heading">

          <div className="section-eyebrow">
            WHY NEUROMATRIX
          </div>

          <h2>
            Your future deserves
            <span> more than a guess.</span>
          </h2>

        </div>

        <div className="about-text">

          <p>
            Choosing what to study or what direction to
            take can be difficult. NeuroMatrix Pathways
            aims to make that journey more thoughtful,
            structured and personal.
          </p>

          <Link
            to="/signup"
            className="text-link"
          >
            Start exploring →
          </Link>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="final-cta">

        <div>

          <div className="section-eyebrow">
            YOUR JOURNEY STARTS HERE
          </div>

          <h2>
            Ready to discover
            <br />
            <span>your path?</span>
          </h2>

          <p>
            Create your NeuroMatrix profile and begin
            your journey of self-discovery.
          </p>

          <Link
            to="/signup"
            className="cta-button"
          >
            Get Started
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <Link to="/" className="brand footer-logo">
            <span className="brand-main">
              NeuroMatrix
            </span>

            <span className="brand-sub">
              Pathways
            </span>
          </Link>

          <p>
            Discover yourself. Understand your potential.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <h4>Explore</h4>
            <a href="#how-it-works">How It Works</a>
            <a href="#discover">Discover</a>
            <a href="#about">About</a>
          </div>

          <div>
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;