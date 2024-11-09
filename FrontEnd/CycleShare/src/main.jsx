// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';  // Import the new ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Create a root using React 18's new API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
  <BrowserRouter>
  
  <App />
  
   
  </BrowserRouter>
);