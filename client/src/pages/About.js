import React from "react";
import "./About.css";
import Timeline from "../components/Timeline";
import {
  FaPython,
  FaJs,
  FaJava,
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiOpencv,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

function SkillCard({ icon, label }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">{icon}</div>
      <span className="skill-label">{label}</span>
    </div>
  );
}

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
          <h2>Technical Skills</h2>

          <div className="skill-category">
            <h3>Programming Languages</h3>
            <div className="skills-grid">
              <SkillCard icon={<FaPython />} label="Python" />
              <SkillCard icon={<FaJs />} label="JavaScript" />
              <SkillCard icon={<FaJava />} label="Java" />
              <SkillCard icon={<SiC />} label="C" />
              <SkillCard icon={<SiCplusplus />} label="C++" />
            </div>
          </div>

          <div className="skill-category">
            <h3>AI / Machine Learning</h3>
            <div className="skills-grid">
              <SkillCard icon={<FaPython />} label="Python" />
              <SkillCard icon={<SiPytorch />} label="PyTorch" />
              <SkillCard icon={<SiTensorflow />} label="TensorFlow" />
              <SkillCard icon={<SiHuggingface />} label="Transformers" />
              <SkillCard icon={<SiOpencv />} label="MediaPipe" />
            </div>
          </div>

          <div className="skill-category">
            <h3>Backend Development</h3>
            <div className="skills-grid">
              <SkillCard icon={<FaNodeJs />} label="Node.js" />
              <SkillCard icon={<SiExpress />} label="Express.js" />
              <SkillCard icon={<TbApi />} label="REST APIs" />
            </div>
          </div>

          <div className="skill-category">
            <h3>Frontend & Desktop</h3>
            <div className="skills-grid">
              <SkillCard icon={<FaJs />} label="JavaScript" />
              <SkillCard icon={<FaReact />} label="React" />
              <SkillCard icon={<FaHtml5 />} label="HTML5" />
              <SkillCard icon={<SiTailwindcss />} label="Tailwind CSS" />
            </div>
          </div>

          <div className="skill-category">
            <h3>Databases & Tools</h3>
            <div className="skills-grid">
              <SkillCard icon={<SiMongodb />} label="MongoDB" />
              <SkillCard icon={<FaGitAlt />} label="Git" />
              <SkillCard icon={<FaGithub />} label="GitHub" />
              <SkillCard icon={<SiPostman />} label="Postman" />
            </div>
          </div>
        </div>

        <div className="about-education">
          <h2>Education</h2>
          <div className="education-list">
            <div className="education-item">
              <div className="education-main">
                <h3>B.Tech, Computer Science and Engineering</h3>
                <span className="education-score">CGPA: 9.46</span>
              </div>
              <p className="education-institute">
                University of Visvesvaraya College of Engineering, Bengaluru
              </p>
              <span className="education-year">2023 — 2027 (Expected)</span>
            </div>
            <div className="education-item">
              <div className="education-main">
                <h3>Class XII, CBSE</h3>
                <span className="education-score">92.2%</span>
              </div>
              <p className="education-institute">
                Jawahar Navodaya Vidyalaya, Uttara Kannada
              </p>
              <span className="education-year">2023</span>
            </div>
            <div className="education-item">
              <div className="education-main">
                <h3>Class X, CBSE</h3>
                <span className="education-score">99.4%</span>
              </div>
              <p className="education-institute">
                Jawahar Navodaya Vidyalaya, Uttara Kannada
              </p>
              <span className="education-year">2021</span>
            </div>
          </div>
        </div>

        <div className="about-timeline">
          <h2>My Journey</h2>
          <Timeline />
        </div>
      </section>
    </div>
  );
}

export default About;
