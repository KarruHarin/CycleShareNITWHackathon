// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Verification from './Verification/Verification';
import HomePage from './Homepage/Homepage';
import RentCyclePage from './Rentcycle/Rentcycle'; 
import Sidebar from './Sidebar/Sidebar';
import { userContext } from './Context/userContext';
import './index.css';
import Cycle from './Cycle/Cycle';

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    <div className="main-content">
      {children}
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState({});

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Verification />} />
        <Route path="/cycles/:id" element={<Cycle />} />
        <Route
          path="/homepage"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/rent"
          element={
            <Layout>
              <RentCyclePage />
            </Layout>
          }
        />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
