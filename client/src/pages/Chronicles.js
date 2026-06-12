import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Chronicles.css";

function Chronicles() {
  const [chronicles, setChronicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chronicles")
      .then((res) => res.json())
      .then((data) => {
        setChronicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="chronicles-page">
      <section className="chronicles-hero">
        <h1>Chronicles</h1>
        <p>Not just outcomes — the full journey, documented.</p>
      </section>

      <div className="chronicles-grid">
        {chronicles.length === 0 ? (
          <p className="empty">No chronicles yet. Check back soon.</p>
        ) : (
          chronicles.map((chronicle) => (
            <Link
              to={`/chronicles/${chronicle._id}`}
              key={chronicle._id}
              className="chronicle-card"
            >
              <div className="chronicle-card-content">
                <h2>{chronicle.title}</h2>
                <p>{chronicle.description}</p>
                <span className="chronicle-posts">
                  {chronicle.totalPosts} posts
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Chronicles;
