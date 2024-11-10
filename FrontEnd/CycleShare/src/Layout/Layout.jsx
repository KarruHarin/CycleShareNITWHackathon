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
  console.log(user);
  const id = localStorage.getItem("id")
  const username = localStorage.getItem("username")
  const college = localStorage.getItem("college")
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SocketProvider userId={id}>
      <div className="flex min-h-screen bg-gray-100">
      <div>
      {isSidebarOpen && (
          <div className="w-64">
            <Sidebar userName={username || "user"} collegeName={college || "College"} />
          </div>
        )}

      </div>
        {/* Sidebar */}
       
        
        {/* Main Content Area */}
        <div className="flex-1">
          <NotificationContainer />
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default Layout;
