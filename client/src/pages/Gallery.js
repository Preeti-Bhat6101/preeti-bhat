import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { API_URL } from "../config";

function Gallery() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/paintings`)
      .then((res) => res.json())
      .then((data) => {
        setPaintings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <h1>Gallery</h1>
        <p>Paintings, sketches, and experiments — the other side of me.</p>
      </section>

      <div className="gallery-grid">
        {paintings.length === 0 ? (
          <p className="empty">No paintings yet. Check back soon.</p>
        ) : (
          paintings.map((painting) => (
            <div key={painting._id} className="painting-card">
              <div
                className="painting-image-wrapper"
                onClick={() => setFullscreenImage(painting.imageUrl)}
              >
                <img src={painting.imageUrl} alt={painting.title} />
                <div className="zoom-hint">⤢ Click to enlarge</div>
              </div>
              <div className="painting-info">
                <div className="painting-meta">
                  <h2>{painting.title}</h2>
                  <div className="painting-tags">
                    {painting.medium && (
                      <span className="tag">{painting.medium}</span>
                    )}
                    {painting.year && (
                      <span className="tag">{painting.year}</span>
                    )}
                  </div>
                </div>
                <p className="short-desc">{painting.shortDescription}</p>
                {painting.fullDescription && (
                  <>
                    {expandedId === painting._id && (
                      <p className="full-desc">{painting.fullDescription}</p>
                    )}
                    <button
                      className="expand-btn"
                      onClick={() =>
                        setExpandedId(
                          expandedId === painting._id ? null : painting._id,
                        )
                      }
                    >
                      {expandedId === painting._id
                        ? "Show less ↑"
                        : "Read more ↓"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {fullscreenImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setFullscreenImage(null)}
          >
            ✕
          </button>
          <img
            src={fullscreenImage}
            alt="Full view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Gallery;
