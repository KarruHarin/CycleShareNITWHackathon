// src/components/Layout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div>
      {isSidebarOpen && (
        <div className="w-64">
          <Sidebar userName="John Doe" collegeName="University College" />
        </div>
      )}
      </div>
      <div className='w-screen '>
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;