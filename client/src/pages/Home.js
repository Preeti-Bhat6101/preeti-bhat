import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Preeti Bhat</h1>
          <p className="hero-tagline">
            Computer Science Student · SIH Winner · AI Builder · Artist
          </p>
          <p className="hero-description">
            A portfolio, journal, and knowledge archive documenting my growth as
            an engineer, artist, and lifelong learner.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link to="/chronicles" className="btn-secondary">
              Read My Journey
            </Link>
          </div>
        </div>
      </section>

      <section className="highlights">
        <h2>Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-card">Smart India Hackathon Winner</div>
          <div className="highlight-card">AI Bootcamp Lead</div>
          <div className="highlight-card">Vahani Scholar</div>
          <div className="highlight-card">Navodayan</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
