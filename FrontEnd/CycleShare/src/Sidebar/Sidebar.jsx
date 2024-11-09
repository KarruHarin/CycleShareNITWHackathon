// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBicycle, FaShareAlt, FaSignOutAlt, FaHistory } from 'react-icons/fa'; // Icons for better visuals

const Sidebar = ({ userName, collegeName }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg p-8 flex flex-col"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Info at the Top */}
      <div className="text-center mb-10">
        <motion.h2
          className="text-2xl font-semibold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {userName ? `Hello, ${userName}` : 'Welcome'}
        </motion.h2>
        {collegeName && (
          <motion.p
            className="text-sm text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {collegeName}
          </motion.p>
        )}
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col space-y-8">
        {/* Rent a Cycle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/rent"
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-teal-500 hover:shadow-lg transition-all duration-300"
          >
            <FaBicycle className="text-xl text-white" />
            <span className="text-white">Rent a Cycle</span>
          </Link>
        </motion.div>

        {/* Share a Cycle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/share"
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-teal-500 hover:shadow-lg transition-all duration-300"
          >
            <FaShareAlt className="text-xl text-white" />
            <span className="text-white">Share a Cycle</span>
          </Link>
        </motion.div>

        {/* Previous Rides Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/previous-rides"
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-teal-500 hover:shadow-lg transition-all duration-300"
          >
            <FaHistory className="text-xl text-white" />
            <span className="text-white">Previous Rides</span>
          </Link>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-teal-500 hover:shadow-lg transition-all duration-300"
          >
            <FaSignOutAlt className="text-xl text-white" />
            <span className="text-white">Logout</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;