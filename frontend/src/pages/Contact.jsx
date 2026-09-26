import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="editorial-page">
      <Navbar />

      <main>
        <section className="editorial-section">
          <p className="editorial-eyebrow">
            CONTACT
          </p>

          <h1>
            Let's start a
            <br />
            <em>conversation.</em>
          </h1>

          <p>
            Have a question about NeuroMatrix Pathways? We'd love to
            hear from you.
          </p>
        </section>
      </main>
    </div>
  );
}