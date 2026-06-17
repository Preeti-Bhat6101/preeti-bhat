import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Chronicles from "./pages/Chronicles";
import ChronicleDetail from "./pages/ChronicleDetail";
import PostDetail from "./pages/PostDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/chronicles" element={<Chronicles />} />
        <Route path="/about" element={<About />} />
        <Route path="/chronicles/:id" element={<ChronicleDetail />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
