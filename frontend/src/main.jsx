// src/main.jsx
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext.jsx'; // Importa el proveedor de autenticación
import PrivateRoute from '../components/PrivateRouter.jsx'
import './index.css';
import RegisterForm from '../pages/user/RegisterForm.jsx';
import EditFomr from '../pages/user/EditForm.jsx';
import ErrorPage from '../pages/user/ErrorPage.jsx';
import HomeBook from '../pages/libro/HomeBook.jsx';
import EditFormBook from '../pages/libro/EditFormBook.jsx';
import RegisterFormBook from '../pages/libro/RegisterFormBook.jsx';
import HomePrestamo from '../pages/prestamos/HomePrestamo.jsx';
import CreatePrestamo from '../pages/prestamos/CreatePrestamo.jsx';
import EditPrestamo from '../pages/prestamos/EditPrestamo.jsx';
import Loading from '../components/Loading.jsx';

//importaciones con lazy

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const Home = React.lazy(  () =>  delayForDemo(import('../pages/user/HomeUser.jsx'))) 
const Login = React.lazy( () =>  import('../pages/login/Login.jsx'))
// Configuración de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Suspense fallback={<Loading></Loading>}>
      <Login />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/home/usuarios",
    element: 
    <Suspense fallback={<Loading/>}>
      <PrivateRoute element={<Home />} />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/edit/usuario/u/:id",
    element: <PrivateRoute element={<EditFomr />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register/usuario",
    element: <PrivateRoute element={<RegisterForm />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home/libros",
    element: <PrivateRoute element={<HomeBook />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register/libro",
    element: <PrivateRoute element={<RegisterFormBook />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/edit/libro/:id",
    element: <PrivateRoute element={<EditFormBook />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home/prestamos",
    element: <PrivateRoute element={<HomePrestamo />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register/prestamo/",
    element: <PrivateRoute element={<CreatePrestamo />} />,
    errorElement: <ErrorPage />
  },
  {
    path: '/edit/prestamo/:id',
    element: <PrivateRoute element={<EditPrestamo />} />,
    errorElement: <ErrorPage />
  }
]);

// Vista principal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
