import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="about-tagline">Engineer · Artist · Lifelong Learner</p>
      </section>

      <section className="about-content">
        <div className="about-story">
          <h2>My Story</h2>
          <p>
            I'm Preeti Bhat, a Computer Science student passionate about
            building things that matter. From winning Smart India Hackathon to
            leading AI bootcamps, I love solving real problems with technology.
            Outside of code, I'm an artist who finds creativity in everything.
          </p>
        </div>

        <div className="about-skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            {[
              "Python",
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
              "Machine Learning",
              "CSS",
              "Git",
            ].map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="about-timeline">
          <h2>Timeline</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-year">2024</span>
              <div className="timeline-content">
                <h3>Smart India Hackathon Winner</h3>
                <p>Won SIH 2024 with Focus Guardian project.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2023</span>
              <div className="timeline-content">
                <h3>Vahani Scholar</h3>
                <p>Selected as a Vahani scholarship recipient.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2023</span>
              <div className="timeline-content">
                <h3>AI Bootcamp Lead</h3>
                <p>Led an AI bootcamp for students.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
