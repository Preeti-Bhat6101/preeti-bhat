import React from "react";
import "./Resume.css";

const FILE_ID = "1NnlD-hpGOHNhHT2hYXGVVFjoe-g709Vw";
// https://drive.google.com/file/d/1NnlD-hpGOHNhHT2hYXGVVFjoe-g709Vw/view?usp=sharing
const EMBED_URL = `https://drive.google.com/file/d/${FILE_ID}/preview`;
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

function Resume() {
  return (
    <div className="resume-page">
      <section className="resume-hero">
        <h1>Resume</h1>
        <p>A snapshot of my journey so far.</p>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noreferrer"
          className="download-btn"
        >
          Download Resume ↓
        </a>
      </section>

      <div className="resume-viewer">
        <iframe src={EMBED_URL} title="Preeti Bhat Resume" allow="autoplay" />
      </div>
    </div>
  );
}

export default Resume;
