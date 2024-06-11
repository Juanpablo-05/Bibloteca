//importaciones
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../pages/login/Login.jsx';
import Home from '../pages/user/HomeUser.jsx';
import RegisterForm from '../pages/user/RegisterForm.jsx';
import EditFomr from '../pages/user/EditForm.jsx';
import ErrorPage from '../pages/user/ErrorPage.jsx';
import HomeBook from '../pages/libro/HomeBook.jsx';
import EditFormBook from '../pages/libro/EditFormBook.jsx';
import RegisterFormBook from '../pages/libro/RegisterFormBook.jsx';

//rutas front
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
    path:"/home/libros",
    element: <HomeBook/>,
    errorElement:<ErrorPage/>
  }
  ,
  {
    path:"/register/usuario",
    element: <RegisterForm/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/register/libro",
    element: <RegisterFormBook/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/edit/usuario/:id",
    element: <EditFomr/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/edit/libro/:id",
    element: <EditFormBook/>,
    errorElement:<ErrorPage/>
  }
]);

//vista main
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
