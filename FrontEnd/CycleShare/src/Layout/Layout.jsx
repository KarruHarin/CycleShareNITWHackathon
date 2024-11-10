// src/components/Layout.js

import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';
import { SocketProvider } from '../context/SocketContext.jsx';
import { NotificationContainer } from '../Notification/NotificationContainer.jsx';
import { userContext } from '../context/userContext.jsx';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useContext(userContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SocketProvider userId={user._id}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64">
            <Sidebar userName={user.name || "John Doe"} collegeName={user.collegeName || "University College"} />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1">
          <button onClick={toggleSidebar} className="p-4 text-gray-700">
            <FaBars />
          </button>
          <NotificationContainer />
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default Layout;
