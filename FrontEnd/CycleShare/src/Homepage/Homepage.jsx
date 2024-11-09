// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="text-center p-8 bg-gray-900 min-h-screen text-white">
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <h1 className="text-4xl font-bold mb-4 text-teal-500">Welcome to Cycle Share!</h1>
        <p className="text-lg mb-6 text-gray-400">
          Cycle Share makes it easy for college students to rent bicycles from
          their peers, providing an affordable, eco-friendly way to get around campus.
        </p>
        <Link to="/register" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300 shadow-lg">
          Get Started
        </Link>
      </motion.header>
      
      <motion.section
        className="grid gap-8 md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.3 } }
        }}
      >
        <motion.div
          className="bg-white text-gray-800 shadow-md p-6 rounded-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-teal-500 mb-2">Real-Time Cycle Listings</h2>
          <p className="text-gray-600 mb-4">
            Browse available cycles on campus and choose the perfect ride for you.
          </p>
          <Link to="/cycles" className="text-teal-500 font-bold hover:underline">View Cycles</Link>
        </motion.div>
        
        <motion.div
          className="bg-white text-gray-800 shadow-md p-6 rounded-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-teal-500 mb-2">Secure Bookings and Payments</h2>
          <p className="text-gray-600 mb-4">
            Reserve a cycle with confidence, knowing that your payments are secure.
          </p>
          <Link to="/booking" className="text-teal-500 font-bold hover:underline">Book Now</Link>
        </motion.div>
        
        <motion.div
          className="bg-white text-gray-800 shadow-md p-6 rounded-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-teal-500 mb-2">Loyalty Program</h2>
          <p className="text-gray-600 mb-4">
            Earn points and rewards for regular use, making every ride count.
          </p>
          <Link to="/loyalty" className="text-teal-500 font-bold hover:underline">Join Loyalty Program</Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;
