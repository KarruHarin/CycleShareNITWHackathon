// src/components/Layout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';
import { SocketProvider } from '../context/SocketContext.jsx';
import { NotificationContainer } from '../Notification/NotificationContainer.jsx';

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
      <SocketProvider>
      <div>
        {/* Your existing layout components */}
        <NotificationContainer />
        <Outlet />
      </div>
    </SocketProvider>
    </div>
  );
};

export default Layout;