import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!post) return <p className="loading">Post not found.</p>;

  return (
    <div className="post-detail-page">
      <div className="post-header">
        <Link to={`/chronicles/${post.chronicle._id}`} className="back-link">
          ← Back to {post.chronicle.title}
        </Link>
        <span className="chapter-badge">Chapter {post.chapterNumber}</span>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      <div className="post-content">{post.content}</div>
    </div>
  );
}

export default PostDetail;
