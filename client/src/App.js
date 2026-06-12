import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Chronicles from "./pages/Chronicles";
import ChronicleDetail from "./pages/ChronicleDetail";
import PostDetail from "./pages/PostDetail";

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
      </Routes>
    </Router>
  );
}

export default App;
