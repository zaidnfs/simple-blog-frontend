import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext"; 
import { API_BASE_URL } from "../config"; // Import backend URL

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { darkMode } = useContext(ThemeContext); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to edit this blog.");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/blogs/${id}`, // Using backend URL from config
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Make sure you are logged in.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}>
        <h2 className="text-3xl font-semibold mb-4">Edit Blog Post</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className={`w-full p-3 mb-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className={`w-full p-3 mb-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#0071E3] text-white py-3 rounded-lg hover:bg-[#005BB5] transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
