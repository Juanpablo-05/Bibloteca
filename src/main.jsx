import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import RegisterForm from '../pages/RegisterForm.jsx';
import EditFomr from '../pages/EditForm.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/home",
    element: <Home/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/register",
    element: <RegisterForm/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/edit",
    element: <EditFomr/>,
    errorElement:<ErrorPage/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
