import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          Preeti Bhat
        </Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={closeMenu}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/achievements" onClick={closeMenu}>
            Achievements
          </Link>
        </li>
        <li>
          <Link to="/resume" onClick={closeMenu}>
            Resume
          </Link>
        </li>
        <li>
          <Link to="/chronicles" onClick={closeMenu}>
            Chronicles
          </Link>
        </li>
        <li>
          <Link to="/gallery" onClick={closeMenu}>
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
