import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBicycle, FaShareAlt, FaSignOutAlt, FaHistory, FaUser } from 'react-icons/fa';

const Sidebar = ({ userName, collegeName }) => {
  
  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-64 bg-amber-50 text-black shadow-lg p-8 flex flex-col border-r border-black"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Info at the Top with decorative border */}
      <div className="text-center mb-10 pb-6 border-b-2 border-black">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center border-2 border-black" >
            <FaUser className="text-2xl text-black" />
          </div>
        </div>
        <motion.h2
          className="text-2xl font-black text-black tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {userName ? userName : 'Welcome'}
        </motion.h2>
        {collegeName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2"
          >
            <p className="text-base font-semibold text-black bg-amber-200 inline-block px-3 py-1 rounded-full border border-black">
              {collegeName}
            </p>
          </motion.div>
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
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-amber-200 hover:shadow-md transition-all duration-300 border-2 border-black"
          >
            <FaBicycle className="text-xl text-black" />
            <span className="text-black">Rent a Cycle</span>
          </Link>
        </motion.div>

        {/* Share a Cycle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/addCycle"
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-amber-200 hover:shadow-md transition-all duration-300 border-2 border-black"
          >
            <FaShareAlt className="text-xl text-black" />
            <span className="text-black">Share a Cycle</span>
          </Link>
        </motion.div>

        {/* Previous Rides Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/history"
            className="flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-amber-200 hover:shadow-md transition-all duration-300 border-2 border-black"
          >
            <FaHistory className="text-xl text-black" />
            <span className="text-black">Previous Rides</span>
          </Link>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            className="w-full flex items-center space-x-4 text-lg font-medium py-3 px-4 rounded-lg hover:bg-amber-200 hover:shadow-md transition-all duration-300 border-2 border-black"
          >
            <FaSignOutAlt className="text-xl text-black" />
            <span className="text-black">Logout</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;