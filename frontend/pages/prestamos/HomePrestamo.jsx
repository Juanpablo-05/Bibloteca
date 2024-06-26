//importaciones
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Nav from '../../components/Nav'
import ButtonRegister from "../../components/ButtonRegister";
import DeletePrestamo from "./DeletePrestamo";


function HomePrestamo() {
  //estados
  const [prestamos, setPrestamos] = useState([]);
  //api
  const url = "http://localhost:3001/prestamos";

  const fetchUsers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPrestamos(data);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener los prestamos:', error);
    }
  };

  useEffect(() => {
    fetchUsers(url);
  }, []);

  //funciones
  const handleDelete = (prestamosId) => {
    setPrestamos(prestamos.filter(prestamos => prestamos.id !== prestamosId));
  };

  //vista
  return (
    <main className="main-home">
      <header className="header-home">
        <Nav/>
      </header>

      <section className="table-container">

        <div className="container-register-btn">
          <ButtonRegister link={'/register/prestamo'} name={'Prestamo'}/>
        </div>

        <h2 className="title">Lista De Prestamos</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Libro</th>
              <th>Usuario</th>
              <th>Fecha Prestamo</th>
              <th>Fecha Devolucion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre_libro}</td>
                <td>{item.nombre_usuario}</td>
                <td>{new Date(item.Fecha_prestamo).toLocaleDateString()}</td>
                <td>{item.Fecha_Devolucion === null ? 'sin devolver' 
                : new Date(item.Fecha_Devolucion).toLocaleDateString()}</td>
                <td className="opc">
                   <DeletePrestamo id={item.id} onDelete={handleDelete} />
                   <Link to={`/edit/prestamo/${item.id}`} className="btn-edit">
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

export default HomePrestamo;
