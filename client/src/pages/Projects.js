import React, { useEffect, useState } from "react";
import "./Projects.css";
import { API_URL } from "../config";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="projects-page">
      <h1 className="projects-title">Projects</h1>
      <p className="projects-subtitle">Things I've built along the way.</p>
      <div className="projects-grid">
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className={`project-card ${expandedId === project._id ? "expanded" : ""}`}
            >
              <div
                className="project-card-header"
                onClick={() => toggleExpand(project._id)}
              >
                <div className="project-title-row">
                  <h2>{project.title}</h2>
                  <span
                    className={`status-badge ${project.status?.toLowerCase().replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="short-desc">{project.shortDescription}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="expand-hint">
                  {expandedId === project._id ? "Show less ↑" : "Read more ↓"}
                </span>
              </div>

              {expandedId === project._id && (
                <div className="project-expanded">
                  {project.fullDescription && (
                    <div className="expanded-section">
                      <h3>About this project</h3>
                      <p>{project.fullDescription}</p>
                    </div>
                  )}
                  {project.whatIBuilt && (
                    <div className="expanded-section">
                      <h3>What I built</h3>
                      <p>{project.whatIBuilt}</p>
                    </div>
                  )}
                  {project.results && (
                    <div className="expanded-section">
                      <h3>Results</h3>
                      <p>{project.results}</p>
                    </div>
                  )}
                  {project.myRole && (
                    <div className="expanded-section">
                      <h3>My role</h3>
                      <p>{project.myRole}</p>
                    </div>
                  )}
                  <div className="project-links">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;
