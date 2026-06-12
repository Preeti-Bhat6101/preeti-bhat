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

  const openAddModal = (type) => {
    setModalType(type);
    setEditingId(null);
    if (type === "project") setFormData(emptyProject);
    if (type === "chronicle")
      setFormData({ title: "", description: "", totalPosts: 0 });
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingId(item._id);
    if (type === "project")
      setFormData({ ...item, technologies: item.technologies.join(", ") });
    if (type === "chronicle") setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await fetch(`/api/${type}s/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    type === "project" ? fetchProjects() : fetchChronicles();
  };

  const handleSubmit = async () => {
    const isProject = modalType === "project";
    const url = editingId
      ? `/api/${isProject ? "projects" : "chronicles"}/${editingId}`
      : `/api/${isProject ? "projects" : "chronicles"}`;
    const method = editingId ? "PUT" : "POST";
    const body = isProject
      ? {
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()),
        }
      : formData;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setShowModal(false);
    isProject ? fetchProjects() : fetchChronicles();
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
            </div>
            <p className="coming-soon">
              Select a chronicle to manage its posts.
            </p>
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
          <button className="modal-submit-btn" onClick={handleSubmit}>
            {editingId ? "Save Changes" : "Create"}
          </button>
        </Modal>
      )}
    </div>
  );
}

export default AdminDashboard;
