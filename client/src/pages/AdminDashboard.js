import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "./AdminDashboard.css";
import { API_URL } from "../config";

const emptyProject = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  whatIBuilt: "",
  results: "",
  myRole: "",
  status: "Completed",
  technologies: "",
  githubLink: "",
  demoLink: "",
  featured: false,
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [chronicles, setChronicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [selectedChronicle, setSelectedChronicle] = useState("");
  const [posts, setPosts] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProjects();
    fetchChronicles();
    fetchPaintings();
    fetchAchievements();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  const fetchChronicles = async () => {
    const res = await fetch(`${API_URL}/api/chronicles`);
    const data = await res.json();
    setChronicles(data);
  };

  const fetchPosts = async (chronicleId) => {
    const res = await fetch(`${API_URL}/api/chronicles/${chronicleId}`);
    const data = await res.json();
    setPosts(data.posts);
  };

  const fetchPaintings = async () => {
    const res = await fetch(`${API_URL}/api/paintings`);
    const data = await res.json();
    setPaintings(data);
  };

  const fetchAchievements = async () => {
    const res = await fetch(`${API_URL}/api/achievements`);
    const data = await res.json();
    setAchievements(data);
  };

  const togglePublish = async (post) => {
    await fetch(`${API_URL}/api/posts/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts(selectedChronicle);
  };

  const openAddModal = (type) => {
    setModalType(type);
    setEditingId(null);
    if (type === "project") setFormData(emptyProject);
    if (type === "chronicle")
      setFormData({ title: "", description: "", totalPosts: 0 });
    if (type === "post")
      setFormData({
        title: "",
        content: "",
        chapterNumber: "",
        readingTime: "",
        published: false,
        chronicle: selectedChronicle,
      });
    if (type === "painting")
      setFormData({
        title: "",
        imageUrl: "",
        shortDescription: "",
        fullDescription: "",
        medium: "",
        year: "",
      });
    if (type === "achievement")
      setFormData({
        title: "",
        category: "Achievements",
        description: "",
        date: "",
        certificateUrl: "",
      });
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingId(item._id);
    if (type === "project")
      setFormData({ ...item, technologies: item.technologies.join(", ") });
    if (type === "chronicle") setFormData(item);
    if (type === "post") setFormData(item);
    if (type === "painting") setFormData(item);
    if (type === "achievement") setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const endpoint =
      type === "project"
        ? "projects"
        : type === "chronicle"
          ? "chronicles"
          : type === "post"
            ? "posts"
            : type === "painting"
              ? "paintings"
              : "achievements";
    await fetch(`${API_URL}/api/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (type === "project") fetchProjects();
    else if (type === "chronicle") fetchChronicles();
    else if (type === "post") fetchPosts(selectedChronicle);
    else if (type === "painting") fetchPaintings();
    else if (type === "achievement") fetchAchievements();
  };

  const handleSubmit = async () => {
    const isProject = modalType === "project";
    const isChronicle = modalType === "chronicle";
    const isPost = modalType === "post";
    const isPainting = modalType === "painting";
    const isAchievement = modalType === "achievement";

    let url, body;

    if (isProject) {
      url = editingId
        ? `${API_URL}/api/projects/${editingId}`
        : `${API_URL}/api/projects`;
      body = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      };
    } else if (isChronicle) {
      url = editingId
        ? `${API_URL}/api/chronicles/${editingId}`
        : `${API_URL}/api/chronicles`;
      body = formData;
    } else if (isPost) {
      url = editingId
        ? `${API_URL}/api/posts/${editingId}`
        : `${API_URL}/api/posts`;
      body = formData;
    } else if (isPainting) {
      url = editingId
        ? `${API_URL}/api/paintings/${editingId}`
        : `${API_URL}/api/paintings`;
      body = formData;
    } else if (isAchievement) {
      url = editingId
        ? `${API_URL}/api/achievements/${editingId}`
        : `${API_URL}/api/achievements`;
      body = formData;
    }

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setShowModal(false);
    if (isProject) fetchProjects();
    else if (isChronicle) fetchChronicles();
    else if (isPost) fetchPosts(selectedChronicle);
    else if (isPainting) fetchPaintings();
    else if (isAchievement) fetchAchievements();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </li>
          <li
            className={activeTab === "chronicles" ? "active" : ""}
            onClick={() => setActiveTab("chronicles")}
          >
            Chronicles
          </li>
          <li
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </li>
          <li
            className={activeTab === "paintings" ? "active" : ""}
            onClick={() => setActiveTab("paintings")}
          >
            Gallery
          </li>
          <li
            className={activeTab === "achievements" ? "active" : ""}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "projects" && (
          <div>
            <div className="admin-header">
              <h1>Projects</h1>
              <button
                className="add-btn"
                onClick={() => openAddModal("project")}
              >
                + Add Project
              </button>
            </div>
            <div className="admin-list">
              {projects.map((project) => (
                <div key={project._id} className="admin-item">
                  <span>{project.title}</span>
                  <div className="admin-item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal("project", project)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("project", project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chronicles" && (
          <div>
            <div className="admin-header">
              <h1>Chronicles</h1>
              <button
                className="add-btn"
                onClick={() => openAddModal("chronicle")}
              >
                + Add Chronicle
              </button>
            </div>
            <div className="admin-list">
              {chronicles.map((chronicle) => (
                <div key={chronicle._id} className="admin-item">
                  <span>{chronicle.title}</span>
                  <div className="admin-item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal("chronicle", chronicle)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("chronicle", chronicle._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            <div className="admin-header">
              <h1>Posts</h1>
              {selectedChronicle && (
                <button
                  className="add-btn"
                  onClick={() => openAddModal("post")}
                >
                  + Add Post
                </button>
              )}
            </div>
            <select
              className="chronicle-select"
              value={selectedChronicle}
              onChange={(e) => {
                setSelectedChronicle(e.target.value);
                fetchPosts(e.target.value);
              }}
            >
              <option value="">-- Select a Chronicle --</option>
              {chronicles.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
            <div className="admin-list" style={{ marginTop: "1.5rem" }}>
              {posts.map((post) => (
                <div key={post._id} className="admin-item">
                  <span>
                    Ch.{post.chapterNumber} — {post.title}
                  </span>
                  <div className="admin-item-actions">
                    <button
                      className={post.published ? "delete-btn" : "edit-btn"}
                      onClick={() => togglePublish(post)}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal("post", post)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("post", post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "paintings" && (
          <div>
            <div className="admin-header">
              <h1>Gallery</h1>
              <button
                className="add-btn"
                onClick={() => openAddModal("painting")}
              >
                + Add Painting
              </button>
            </div>
            <div className="admin-list">
              {paintings.map((painting) => (
                <div key={painting._id} className="admin-item">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={painting.imageUrl}
                      alt={painting.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <span>{painting.title}</span>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal("painting", painting)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("painting", painting._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "achievements" && (
          <div>
            <div className="admin-header">
              <h1>Achievements</h1>
              <button
                className="add-btn"
                onClick={() => openAddModal("achievement")}
              >
                + Add Achievement
              </button>
            </div>
            <div className="admin-list">
              {achievements.map((achievement) => (
                <div key={achievement._id} className="admin-item">
                  <span>
                    {achievement.category} — {achievement.title}
                  </span>
                  <div className="admin-item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal("achievement", achievement)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete("achievement", achievement._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          title={`${editingId ? "Edit" : "Add"} ${modalType === "project" ? "Project" : "Chronicle"}`}
          onClose={() => setShowModal(false)}
        >
          {modalType === "project" && (
            <>
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Short Description (shown on collapsed card)"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
              />
              <textarea
                placeholder="Full Project Overview (what problem it solves, why it exists)"
                value={formData.fullDescription}
                onChange={(e) =>
                  setFormData({ ...formData, fullDescription: e.target.value })
                }
              />
              <textarea
                placeholder="What I Built (your specific contributions and technical details)"
                value={formData.whatIBuilt}
                onChange={(e) =>
                  setFormData({ ...formData, whatIBuilt: e.target.value })
                }
              />
              <input
                placeholder="Results / Impact (e.g. 96% accuracy, 500 users)"
                value={formData.results}
                onChange={(e) =>
                  setFormData({ ...formData, results: e.target.value })
                }
              />
              <input
                placeholder="My Role (e.g. Solo, Frontend Lead, ML Engineer)"
                value={formData.myRole}
                onChange={(e) =>
                  setFormData({ ...formData, myRole: e.target.value })
                }
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Deployed">Not Deployed</option>
                <option value="Archived">Archived</option>
              </select>
              <input
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value })
                }
              />
              <input
                placeholder="GitHub Link"
                value={formData.githubLink}
                onChange={(e) =>
                  setFormData({ ...formData, githubLink: e.target.value })
                }
              />
              <input
                placeholder="Demo Link"
                value={formData.demoLink}
                onChange={(e) =>
                  setFormData({ ...formData, demoLink: e.target.value })
                }
              />
            </>
          )}
          {modalType === "chronicle" && (
            <>
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                placeholder="Total Posts (planned)"
                type="number"
                value={formData.totalPosts}
                onChange={(e) =>
                  setFormData({ ...formData, totalPosts: e.target.value })
                }
              />
            </>
          )}

          {modalType === "post" && (
            <>
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <input
                placeholder="Chapter Number"
                type="number"
                value={formData.chapterNumber}
                onChange={(e) =>
                  setFormData({ ...formData, chapterNumber: e.target.value })
                }
              />
              <input
                placeholder="Reading Time (minutes)"
                type="number"
                value={formData.readingTime}
                onChange={(e) =>
                  setFormData({ ...formData, readingTime: e.target.value })
                }
              />
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                />
                Publish immediately
              </label>
            </>
          )}
          {modalType === "painting" && (
            <>
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                placeholder="Image URL (from Cloudinary)"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
              <input
                placeholder="Short Description (one liner)"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
              />
              <textarea
                placeholder="Full Description (optional, for paintings with more to say)"
                value={formData.fullDescription}
                onChange={(e) =>
                  setFormData({ ...formData, fullDescription: e.target.value })
                }
              />
              <input
                placeholder="Medium (e.g. Watercolour, Acrylic, Digital)"
                value={formData.medium}
                onChange={(e) =>
                  setFormData({ ...formData, medium: e.target.value })
                }
              />
              <input
                placeholder="Year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </>
          )}
          {modalType === "achievement" && (
            <>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Achievements">Achievements</option>
                <option value="Leadership & Impact">Leadership & Impact</option>
                <option value="Learning & Certifications">
                  Learning & Certifications
                </option>
              </select>
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                placeholder="Date (e.g. Dec 2024)"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                placeholder="Certificate Image URL (optional, from Cloudinary)"
                value={formData.certificateUrl}
                onChange={(e) =>
                  setFormData({ ...formData, certificateUrl: e.target.value })
                }
              />
            </>
          )}
          <button className="modal-submit-btn" onClick={handleSubmit}>
            {editingId ? "Save Changes" : "Create"}
          </button>
        </Modal>
      )}
    </div>
  );
}

export default AdminDashboard;
