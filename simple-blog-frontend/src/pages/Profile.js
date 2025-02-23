import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext"; 
import  API_BASE_URL  from "../config"; // ✅ Import backend URL

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const token = localStorage.getItem("token");
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setName(response.data.name);
        setBio(response.data.bio);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        { name, bio, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-md text-center ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}>
        <h2 className="text-3xl font-semibold mb-6">User Profile</h2>

        {user && (
          <>
            {/* Profile Avatar */}
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={avatar || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
              />
            </div>
            <h3 className="text-2xl font-medium mt-4">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
          </>
        )}

        {/* Update Profile Form */}
        <form className="mt-6 space-y-4" onSubmit={handleUpdateProfile}>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] bg-transparent"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] bg-transparent"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-[#0071E3] focus:border-[#0071E3] bg-transparent"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#0071E3] text-white py-3 rounded-lg hover:bg-[#005BB5] transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
