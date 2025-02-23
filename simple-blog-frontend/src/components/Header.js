import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Import Theme Context

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // ✅ Get Theme State
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={`p-4 shadow-md transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="hover:text-[#0071E3] transition">
            Simple Blog 🍏
          </Link>
        </h1>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Profile & Auth Buttons */}
          {token ? (
            <>
              <Link
                to="/profile"
                className="bg-[#0071E3] hover:bg-[#005BB5] text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#0071E3] hover:bg-[#005BB5] text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
