import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import Login from './Login/Login';
import { UserProvider } from './context/userContext'; // Import UserProvider

// Create a wrapper component that includes the UserProvider
const WrappedApp = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedApp><Layout /></WrappedApp>,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "/homepage",
        element: <HomePage />
      },
      {
        path: "/rent",
        element: <Rentcycle />
      },
      {
        path: "/history",
        element: <BookingHistory />
      },
      {
        path: "/addCycle",
        element: <AddCycleForm />
      },
      {
        path: "/user",
        element: <UserProfile />
      },
      {
        path: "/cycles/:id",
        element: <Cycle />
      }
    ]
  },
  {
    path: "/login",
    element: <WrappedApp><Login /></WrappedApp>
  },
  {
    path: "/register",
    element: <WrappedApp><Register /></WrappedApp>
  },
  {
    path: "/otp",
    element: <WrappedApp><Verification /></WrappedApp>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);