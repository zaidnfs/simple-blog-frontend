import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Import Theme Context

const Footer = () => {
  const { darkMode } = useContext(ThemeContext); // ✅ Get Theme State

  return (
    <footer className={`p-4 text-center transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <p>&copy; 2025 Simple Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
