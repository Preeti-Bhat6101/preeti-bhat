import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "./AdminDashboard.css";

const emptyProject = {
  title: "",
  description: "",
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
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProjects();
    fetchChronicles();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const fetchChronicles = async () => {
    const res = await fetch("/api/chronicles");
    const data = await res.json();
    setChronicles(data);
  };

  const fetchPosts = async (chronicleId) => {
    const res = await fetch(`/api/chronicles/${chronicleId}`);
    const data = await res.json();
    setPosts(data.posts);
  };

  const togglePublish = async (post) => {
    await fetch(`/api/posts/${post._id}`, {
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
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingId(item._id);
    if (type === "project")
      setFormData({ ...item, technologies: item.technologies.join(", ") });
    if (type === "chronicle") setFormData(item);
    if (type === "post") setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const endpoint =
      type === "project"
        ? "projects"
        : type === "chronicle"
          ? "chronicles"
          : "posts";
    await fetch(`/api/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (type === "project") fetchProjects();
    else if (type === "chronicle") fetchChronicles();
    else if (type === "post") fetchPosts(selectedChronicle);
  };

  const handleSubmit = async () => {
    const isProject = modalType === "project";
    const isChronicle = modalType === "chronicle";
    const isPost = modalType === "post";

    let url, body;

    if (isProject) {
      url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      body = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      };
    } else if (isChronicle) {
      url = editingId ? `/api/chronicles/${editingId}` : "/api/chronicles";
      body = formData;
    } else if (isPost) {
      url = editingId ? `/api/posts/${editingId}` : "/api/posts";
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
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
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
          <button className="modal-submit-btn" onClick={handleSubmit}>
            {editingId ? "Save Changes" : "Create"}
          </button>
        </Modal>
      )}
    </div>
  );
}

export default AdminDashboard;
