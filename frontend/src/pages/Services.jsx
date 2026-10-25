import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/editorial.css";

const counsellingPackages = {
  "Grades 8–10": [
    {
      title: "Counselling Package",
      description: "A focused counselling experience for students exploring their academic and career direction.",
      features: [
        "Login access for self-research tools",
        "Mailers on courses or careers",
        "Two counselling sessions of 1 hour each",
        "Psychometric testing for personality and aptitude",
      ],
      price: "Contact us",
    },
    {
      title: "Assessment & Counselling Package",
      description: "Assessment-led counselling for deeper understanding of interests, personality and aptitude.",
      features: [
        "Login access for self-research tools",
        "Mailers on courses or careers",
        "Three counselling sessions of 1 hour each",
        "Psychometric testing for personality and aptitude",
        "Detailed report and analysis with career indications",
      ],
      price: "Contact us",
    },
    {
      title: "India Complete Package (UG)",
      description: "A complete undergraduate pathway covering counselling, college exploration and admission guidance.",
      features: [
        "Login access for self-research tools",
        "Mailers on courses or careers",
        "5–6 counselling sessions a year",
        "Guidance on admission test process",
        "Shortlisting colleges (Best-fit, Safe-fit)",
        "Personal portfolio and resume guidance",
      ],
      price: "Contact us",
    },
    {
      title: "International Complete Package",
      description: "End-to-end international education guidance for students planning undergraduate study abroad.",
      features: [
        "Login access to research tools",
        "Mailers on courses or careers",
        "5–6 counselling sessions a year",
        "College shortlisting (Best-fit, Safe-fit)",
        "SOP/Essay, LOR & CV guidance",
        "SAT/IELTS/TOEFL guidance",
        "Scholarship & visa support",
      ],
      price: "Contact us",
    },
    {
      title: "International Complete Package (UG)",
      description: "A structured international undergraduate pathway with application and admissions support.",
      features: [
        "Login access to research tools",
        "Mailers on courses or careers",
        "5–6 counselling sessions a year",
        "College shortlisting (Best-fit, Safe-fit)",
        "SOP/Essay, LOR & CV guidance",
        "SAT/IELTS/TOEFL guidance",
        "Scholarship & visa support",
      ],
      price: "Contact us",
    },
  ],

  "Grades 11–12": [
    {
      title: "Counselling Package",
      description: "Focused counselling to help students navigate subject, course and career decisions.",
      features: [
        "Login access to self-research tools",
        "Mailers on courses or careers",
        "Two counselling sessions of 1 hour each",
        "Psychometric testing for personality and aptitude",
      ],
      price: "Contact us",
    },
    {
      title: "Assessment & Counselling Package",
      description: "A deeper assessment and counselling pathway with detailed career analysis.",
      features: [
        "Login access to self-research tools",
        "Mailers on courses or careers",
        "Three counselling sessions of 1 hour each",
        "Psychometric testing for personality and aptitude",
        "Detailed report and analysis",
      ],
      price: "Contact us",
    },
  ],
};

const guidancePrograms = [
  {
    title: "Smart Apply",
    tag: "End-to-End Admissions",
    price: "Contact us",
    recommended: true,
    features: [
      "University shortlisting & overall guidance",
      "Admission process & test guidance",
      "SOP & essay drafting support",
      "Application & VISA document guidance",
      "Application filing for up to 8 universities",
      "Tracking university decisions — selections & rejections",
      "Support in final university selection",
      "Complete VISA processing & interview preparation",
    ],
  },
  {
    title: "Promap",
    price: "₹23,600/-",
    features: [
      "2 Psychometric tests with detailed analysis",
      "3 fixed counselling sessions",
      "Personalized CV roadmap (courses, activities & books)",
      "Combination of free & paid learning programs",
      "Interaction with alumni for real-life insights",
      "Peer interaction with like-minded students",
      "Interview tips & SOP writing session",
      "CV generation",
      "50 days structured program",
    ],
  },
  {
    title: "GEM India",
    price: "₹27,140/-",
    features: [
      "Under the Indian colleges admission guidance service",
      "Guidance based on aptitude and interest",
      "College options based on the student's profile",
      "Exhaustive college shortlist",
      "Admission process guidance",
      "Application timeline guidance",
      "Test guidance wherever applicable",
      "SOP guidance wherever applicable",
      "Coaching institute details",
      "Final university selection support",
    ],
    note: "We will fill applications only for Ashoka and FLAME University (and similar). For other colleges, application links will be shared for you to complete.",
  },
];

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`service-flip-card ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="service-flip-inner">

        {/* FRONT */}
        <div className="service-card-face service-card-front">

          {item.recommended && (
            <span className="service-recommended">
              Recommended
            </span>
          )}

          <div className="service-card-icon">
            ✦
          </div>

          <h3>{item.title}</h3>

          {item.tag && (
            <span className="service-card-tag">
              {item.tag}
            </span>
          )}

          <p className="service-card-description">
            {item.description}
          </p>

          <div className="service-feature-preview">
            {item.features.slice(0, 4).map((feature, index) => (
              <div key={index}>
                <span>✓</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>

          <span className="flip-hint">
            Click to view package →
          </span>

        </div>


        {/* BACK */}
        <div className="service-card-face service-card-back">

          <span className="back-label">
            YOUR PATHWAY
          </span>

          <h3>{item.title}</h3>

          <div className="service-price">
            {item.price}
          </div>

          <div className="back-features">
            {item.features.map((feature, index) => (
              <div key={index}>
                <span>✓</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>

          {item.note && (
            <div className="service-note">
              <strong>Note</strong>
              <p>{item.note}</p>
            </div>
          )}

          <Link
            to="/contact"
            className="service-card-button"
            onClick={(e) => e.stopPropagation()}
          >
            Enquire Now →
          </Link>

          <span className="flip-hint">
            Click to flip back
          </span>

        </div>

      </div>
    </div>
  );
}


export default function Services() {
  const [grade, setGrade] = useState("Grades 8–10");

  return (
    <div className="services-page">

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="services-hero">

        <div className="services-hero-content">

          <span className="services-eyebrow">
            NEUROMATRIX / SERVICES
          </span>

          <h1>
            Guidance designed
            <br />
            around <em>your pathway.</em>
          </h1>

          <p>
            Explore counselling, assessment and guidance programs
            designed to help students make clearer academic,
            career and education decisions.
          </p>

        </div>

        <div className="services-hero-orbit">
          <span>✦</span>
          <span>◎</span>
          <span>◇</span>
        </div>

      </section>


      {/* ================= COUNSELLING ================= */}

      <section className="counselling-packages">

        <div className="services-heading">

          <span className="services-small-label">
            COUNSELLING PACKAGES
          </span>

          <h2>
            Choose the support
            <br />
            <em>that fits your stage.</em>
          </h2>

          <p>
            Comprehensive plans tailored for students at different
            stages of academic and career exploration.
          </p>

        </div>


        {/* GRADE SWITCH */}

        <div className="grade-switch">

          <button
            className={grade === "Grades 8–10" ? "active" : ""}
            onClick={() => setGrade("Grades 8–10")}
          >
            Grades 8–10
          </button>

          <button
            className={grade === "Grades 11–12" ? "active" : ""}
            onClick={() => setGrade("Grades 11–12")}
          >
            Grades 11–12
          </button>

        </div>


        <div className="services-card-grid">

          {counsellingPackages[grade].map((item, index) => (
            <FlipCard
              item={item}
              key={`${grade}-${index}`}
            />
          ))}

        </div>

      </section>


      {/* ================= GUIDANCE ================= */}

      <section className="guidance-programs">

        <div className="services-heading centered">

          <span className="services-small-label">
            GUIDANCE PROGRAMS
          </span>

          <h2>
            More support.
            <br />
            <em>More direction.</em>
          </h2>

          <p>
            For students who need more structured support through
            admissions, applications and future planning.
          </p>

        </div>


        <div className="services-card-grid guidance-grid">

          {guidancePrograms.map((item, index) => (
            <FlipCard
              item={item}
              key={index}
            />
          ))}

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="services-cta">

        <div>

          <span>
            NOT SURE WHAT FITS?
          </span>

          <h2>
            Let's find the
            <br />
            right <em>pathway.</em>
          </h2>

        </div>

        <Link to="/contact">
          TALK TO OUR TEAM →
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="services-footer">

        <strong>
          NEUROMATRIX PATHWAYS
        </strong>

        <span>
          Helping students understand,
          explore and move forward.
        </span>

      </footer>

    </div>
  );
}