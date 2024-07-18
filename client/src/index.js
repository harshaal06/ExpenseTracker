import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  <Toaster />
  <RouterProvider router={router} />
  </>
);