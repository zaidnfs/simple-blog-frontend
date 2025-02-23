import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Import Theme Context
import API_BASE_URL from "../config"; // ✅ Import API Base URL

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const { darkMode } = useContext(ThemeContext); // ✅ Get Dark Mode state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete posts.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Make sure you are logged in.");
    }
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-300 flex flex-col items-center justify-center ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* ✅ Floating "New Post" Button (Always Visible) */}
      {token && (
        <Link
          to="/create"
          className="fixed bottom-10 right-10 bg-[#0071E3] hover:bg-[#005BB5] text-white px-6 py-3 rounded-full shadow-lg transition-all"
        >
          + New Post
        </Link>
      )}

      {/* Header Section */}
      <div className="max-w-4xl w-full px-6 text-center mt-20">
        <h1 className="text-5xl font-semibold mb-8">Latest Blog Posts</h1>
      </div>

      {/* Blog Cards */}
      <div className="max-w-4xl w-full grid gap-8 grid-cols-1 md:grid-cols-2 px-6 pb-16">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg col-span-2">
            No blog posts available.
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className={`p-6 rounded-lg shadow-md hover:shadow-xl transition-all border ${
                darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{blog.content.substring(0, 120)}...</p>

              <div className="mt-4 flex justify-between items-center">
                <Link to={`/blogs/${blog._id}`} className="text-[#0071E3] dark:text-blue-400 hover:underline">
                  Read More
                </Link>

                {token && (
                  <div className="flex gap-3">
                    <Link to={`/edit/${blog._id}`} className="text-[#0071E3] dark:text-blue-400 hover:underline">
                      Edit
                    </Link>
                    <button
                      className="text-[#FF3B30] hover:underline"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
