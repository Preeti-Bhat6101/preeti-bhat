import React, { useEffect, useState } from "react";
import "./Achievements.css";

const categories = [
  "Achievements",
  "Leadership & Impact",
  "Learning & Certifications",
];

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certificateImage, setCertificateImage] = useState(null);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="achievements-page">
      <section className="achievements-hero">
        <h1>Achievements</h1>
        <p>Wins, leadership, and the moments that shaped me along the way.</p>
      </section>

      <div className="achievements-content">
        {categories.map((category) => {
          const items = achievements.filter((a) => a.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="achievement-category">
              <h2>{category}</h2>
              <div className="achievement-list">
                {items.map((item) => (
                  <div key={item._id} className="achievement-card">
                    <div className="achievement-card-header">
                      <h3>{item.title}</h3>
                      {item.date && (
                        <span className="achievement-date">{item.date}</span>
                      )}
                    </div>
                    <p>{item.description}</p>
                    {item.certificateUrl && (
                      <button
                        className="view-cert-btn"
                        onClick={() => setCertificateImage(item.certificateUrl)}
                      >
                        View Certificate ↗
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {achievements.length === 0 && (
          <p className="empty">No achievements added yet.</p>
        )}
      </div>

      {certificateImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setCertificateImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setCertificateImage(null)}
          >
            ✕
          </button>
          <img
            src={certificateImage}
            alt="Certificate"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Achievements;
