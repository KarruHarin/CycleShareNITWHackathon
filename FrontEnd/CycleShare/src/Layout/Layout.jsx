// src/components/Layout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-64">
          <Sidebar userName="John Doe" collegeName="University College" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Button */}
        <header className="bg-gray-900 text-white p-4 flex items-center">
          <button onClick={toggleSidebar} className="text-xl focus:outline-none">
            <FaBars />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Cycle Share</h1>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <Outlet /> {/* This will render the child routes like HomePage */}
        </main>
      </div>
    </div>
  );
};

export default Layout;