import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import './index.css';
import { MyContext } from './components/MyContext';
import axios from 'axios';
import ShowError from './views/ShowError';
import EmailVerificationPage from './views/EmailVerificationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,
  },
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
  },
  {
    path: "/*",
    element: <ShowError />,
  },
]);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    // if (document.cookie.split('; ').find(row => row.startsWith('access_token='))) {
    //   const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, { withCredentials: true })
    // setUser(response.data.data);
    // }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
        withCredentials: true, // Send cookies with the request
      });

      if (response.data.success) {
        setUser(response.data.data); // Set user data if token is valid
      } else {
        setUser(null); // No valid token or unauthorized
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null); // Clear user if token is invalid
    }
  }, [])

  return (
    <MyContext.Provider value={{ user, setUser }}>
      <Toaster />
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);