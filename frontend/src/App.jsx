import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/user/Login.jsx';
import Home from '../pages/user/HomeUser.jsx';
// import UserDashboard from './pages/UserDashboard';
// import BookDashboard from './pages/BookDashboard';
// import LoanDashboard from './pages/LoanDashboard';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Usamos token para saber si está autenticado

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/usuarios" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/libros" element={isAuthenticated ? <BookDashboard /> : <Navigate to="/login" />} />
        <Route path="/prestamos" element={isAuthenticated ? <LoanDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

