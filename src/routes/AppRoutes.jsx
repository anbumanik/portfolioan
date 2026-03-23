import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "../pages/Portfolio";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
