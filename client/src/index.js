import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import './index.css';
import { MyContext } from './components/MyContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
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