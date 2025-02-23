import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; 
import  API_BASE_URL  from "../config"; // ✅ Import backend URL

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-md ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}>
        <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 mb-3 border rounded-md focus:ring-[#0071E3] focus:border-[#0071E3] ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 mb-3 border rounded-md focus:ring-[#0071E3] focus:border-[#0071E3] ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 mb-3 border rounded-md focus:ring-[#0071E3] focus:border-[#0071E3] ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-[#0071E3] text-white py-3 rounded-md hover:bg-[#005BB5] transition">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#0071E3] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
