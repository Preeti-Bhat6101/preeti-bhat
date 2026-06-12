import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
