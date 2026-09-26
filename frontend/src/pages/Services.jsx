import Navbar from "../components/Navbar";

export default function Services() {
  return (
    <div className="editorial-page">
      <Navbar />

      <main>
        <section className="editorial-section">
          <p className="editorial-eyebrow">
            OUR SERVICES
          </p>

          <h1>
            Support for your
            <br />
            <em>next step.</em>
          </h1>

          <p>
            Explore assessment and guidance pathways designed to help
            students understand their strengths and possible directions.
          </p>
        </section>
      </main>
    </div>
  );
}