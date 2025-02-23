import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Import Theme Context

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { darkMode } = useContext(ThemeContext); // ✅ Get Dark Mode state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/blogs/${id}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className={`p-8 rounded-lg shadow-lg max-w-3xl w-full ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}>
        {blog && (
          <>
            <h1 className="text-4xl font-semibold mb-4">{blog.title}</h1>
            <p className="leading-relaxed">{blog.content}</p>

            {/* Comment Section */}
            <h2 className="mt-8 text-2xl font-semibold border-b border-gray-300 pb-2">Comments</h2>
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                }`}
              />
              <button
                onClick={handleCommentSubmit}
                className="px-5 py-2 bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-lg transition duration-300"
              >
                Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="mt-6 space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((c, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                  }`}>
                    {/* User Avatar */}
                    <img
                      src={c.user?.avatar || "/default-avatar.png"} // ✅ Fixed issue
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                    />

                    {/* Comment Content */}
                    <div>
                      <p className="font-semibold">{c.user?.name || "Anonymous"}</p>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
