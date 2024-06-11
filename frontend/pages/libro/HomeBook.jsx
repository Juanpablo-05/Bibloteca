//importaciones
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import DeleteBook from "./DeleteBook";


function HomeBook() {
  //estados
  const [books, setBooks] = useState([]);
  //api
  const url = "http://localhost:3001/libro";

  const fetchUsers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers(url);
  }, []);

  //funciones
  const handleDelete = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  //vista
  return (
    <main className="main-home">
      <header className="header-home">
        <nav className="nav-home">
          <ul className="nav__ul">
            <li>
              <Link to={"/register/libro"} className="li-items">
                Registrar Libro
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Autor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.autor}</td>
                <td className="opc">
                   <DeleteBook id={item.id} onDelete={handleDelete} /> 
                  <Link to={`/edit/libro/${item.id}`} className="btn-edit">
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

export default HomeBook;
