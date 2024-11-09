// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomeIcon, LogIn } from 'lucide-react';
import Layout from './Layout/Layout';
import HomePage from './Homepage/Homepage';
import Rentcycle from './Rentcycle/Rentcycle';
import BookingHistory from './user/userHistory';
import AddCycleForm from './Cycle/AddNewCycle';
import UserProfile from './user/userProfile';
import Cycle from './Cycle/Cycle';
import Register from './Register/Register';
import Verification from './Verification/Verification';
import { RouterProvider } from 'react-router-dom';
import Login from './Login/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"/homepage",
        element:<HomePage/>
      },
      {
        path:"/rent",
        element:<Rentcycle/>
      },
      {
        path:"/history",
        element:<BookingHistory/>
      },
      {
        path:"/addCycle",
        element:<AddCycleForm/>
      },
      {
        path:"/user",
        element:<UserProfile/>
      },
      {
        path:"/cycles/:id",
        element:<Cycle/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/otp",
    element:<Verification/>
  }
])


// Render the app inside the root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);
