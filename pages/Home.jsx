//importaciones
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteForm from "./DeleteForm";
import { HiMiniPencilSquare } from "react-icons/hi2";


function Home() {
  //estados
  const [users, setUsers] = useState([]);
  //api
  const url = "http://localhost:3001/usuarios";

  const fetchUsers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers(url);
  }, []);

  //funciones
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.identificacion !== userId));
  };

  //vista
  return (
    <main className="main-home">
      <header className="header-home">
        <nav className="nav-home">
          <ul className="nav__ul">
            <li>
              <Link to={"/register"} className="li-items">
                Registrar Usuario
              </Link>
              <span className="barra"></span>
            </li>
          </ul>
        </nav>
      </header>

      <section className="table-container">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.identificacion}>
                <td>{item.identificacion}</td>
                <td>{item.nombre}</td>
                <td>{item.usuario}</td>
                <td className="opc">
                  <DeleteForm id={item.identificacion} onDelete={handleDelete} /> 
                  <Link to={'/edit'} className="btn-edit">
                    <HiMiniPencilSquare />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Home;
