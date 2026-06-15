import React, { useState } from "react";
import "./Contact.css";

const reasons = [
  "Collaboration",
  "Just saying hi",
  "Feedback",
  "Something else",
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", reason: "", message: "" });
      } else {
        setStatus("failed");
      }
    } catch (err) {
      setStatus("failed");
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Say Hello</h1>
        <p>
          I don't bite. Promise. Whether you're a recruiter, a fellow builder,
          or just someone who stumbled here — I'd genuinely love to hear from
          you.
        </p>
      </section>

      <div className="contact-container">
        <div className="contact-form">
          <div className="form-group">
            <label>
              What do I call you? <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Where can I find you? <span className="required">*</span>
            </label>
            <input
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              What's on your mind? <span className="optional">(optional)</span>
            </label>
            <div className="reason-options">
              {reasons.map((r) => (
                <button
                  key={r}
                  className={`reason-btn ${formData.reason === r ? "selected" : ""}`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      reason: formData.reason === r ? "" : r,
                    })
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              Tell me everything <span className="required">*</span>
            </label>
            <textarea
              placeholder="What would you like to say?"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {status === "error" && (
            <p className="form-status error">
              Please fill in all required fields.
            </p>
          )}
          {status === "failed" && (
            <p className="form-status error">
              Something went wrong. Please try again.
            </p>
          )}
          {status === "success" && (
            <p className="form-status success">
              Your message is on its way! I'll get back to you soon ✨
            </p>
          )}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send it my way →"}
          </button>
        </div>

        <div className="contact-aside">
          <h2>Other ways to reach me</h2>
          <p>If forms aren't your thing, find me here:</p>
          <ul>
            <li>
              <a
                href="https://github.com/Preeti-Bhat6101"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/preeti-venkatramanbhat2027"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:preetibhat6101@gmail.com">
                preetibhat6101@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
