import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import ThemeProvider
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <ThemeProvider> {/* ✅ Wrap app in ThemeProvider */}
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
          <Header />
          <main className="flex-1 w-full max-w-6xl mx-auto px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
