import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [chronicles, setChronicles] = useState([]);
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
              <button className="add-btn">+ Add Project</button>
            </div>
            <div className="admin-list">
              {projects.map((project) => (
                <div key={project._id} className="admin-item">
                  <span>{project.title}</span>
                  <div className="admin-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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
              <button className="add-btn">+ Add Chronicle</button>
            </div>
            <div className="admin-list">
              {chronicles.map((chronicle) => (
                <div key={chronicle._id} className="admin-item">
                  <span>{chronicle.title}</span>
                  <div className="admin-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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
              <button className="add-btn">+ Add Post</button>
            </div>
            <p className="coming-soon">
              Select a chronicle to manage its posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
