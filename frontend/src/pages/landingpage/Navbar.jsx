import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Leaf, User, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import logo from "../../assets/react.svg"; // Import your logo

function GamifiedNavbar() {
  const [hasEmail, setHasEmail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("username");
    const isUser = localStorage.getItem("isAdmin");
    setIsAdmin(isUser === "true");
    setHasEmail(!!storedEmail);
  }, []);

  return (
    <motion.header
      className=" text-white border-b border-white/20 shadow-md shadow-white/10 border-green-300"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(to right, black, #497D74)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
       <div
               className="flex items-center space-x-3 cursor-pointer"
               onClick={() => navigate("/")}
             >
               <img
                 src={logo}
                 alt="Ecosphere Logo"
                 className="h-10 w-10 rounded-full"
               />
               <button className="text-2xl font-bold text-green-400">DigiKshetra</button>
             </div>
        
        <nav className="hidden md:flex items-center gap-6">
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/campaigns")}
        >
          Campaigns
        </li>
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/blogs")}
        >
          Blogs
        </li>
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/lessons")}
        >
          Lessons
        </li>
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/products")}
        >
          Store
        </li>
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/climatetimemachine")}
        >
          Games
        </li>
        <li
          className="hover:text-green-400 cursor-pointer"
          onClick={() => navigate("/books")}
        >
          E-books
        </li>
        </nav>

        <div className="flex items-center gap-4">
          {hasEmail ? (
            <motion.div
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <BadgeCheck className="w-5 h-5" /> Level 3 Eco-Warrior
            </motion.div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          )}
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-green-50 shadow-md absolute w-full py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="text-center space-y-3">
            <li><Link to="/campaign" className="block hover:text-green-600">Campaigns</Link></li>
            <li><Link to="/leaderboard" className="block hover:text-green-600">Leaderboard</Link></li>
            <li><Link to="/challenges" className="block hover:text-green-600">Challenges</Link></li>
            <li><Link to="/profile" className="block hover:text-green-600">Profile</Link></li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}

export default GamifiedNavbar;