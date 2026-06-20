import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ChronicleDetail.css";
import { API_URL } from "../config";

function ChronicleDetail() {
  const { id } = useParams();
  const [chronicle, setChronicle] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/chronicles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChronicle(data.chronicle);
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="loading">Loading...</p>;
  if (!chronicle) return <p className="loading">Chronicle not found.</p>;

  return (
    <div className="chronicle-detail-page">
      <section className="chronicle-detail-hero">
        <Link to="/chronicles" className="back-link">
          ← Back to Chronicles
        </Link>
        <h1>{chronicle.title}</h1>
        <p>{chronicle.description}</p>
        <span className="progress">
          {posts.length} / {chronicle.totalPosts} Posts Published
        </span>
        {posts.length > 0 && (
          <input
            className="search-input"
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </section>

      <div className="posts-list">
        {filtered.length === 0 ? (
          <p className="empty">No posts found.</p>
        ) : (
          filtered.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="post-item"
            >
              <span className="chapter-num">Chapter {post.chapterNumber}</span>
              <div className="post-item-content">
                <h2>{post.title}</h2>
                <span className="reading-time">
                  {post.readingTime} min read
                </span>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ChronicleDetail;
