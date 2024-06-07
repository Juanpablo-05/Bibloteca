import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteForm from "./DeleteForm";

function Home() {
     
    const [user, setUser] = useState([])

    const url= "http://localhost:3001/usuarios"

    const api = async (url) => 
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            setUser(data);
            console.log(data); 
        });
    
    useEffect(() => {
        api(url)
    }, []);
    

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
            <li>
              <Link to={"/edit"} className="li-items">
                Editar Usuario
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
          {
            user.map((item, index) => (
                <tr key={index}>
                    <td>{item.identificacion}</td>
                    <td>{item.nombre}</td>
                    <td>{item.usuario}</td>
                    {/* <td>
                      <Link to={`/edit/${item.id}`}>
                        <button className="btn-edit">Editar</button>
                      </Link>
                      <Link to={`/delete/${item.id}`}>
                        <button className="btn-delete">Eliminar</button>
                      </Link>
                    </td> */}
                    <td>
                      <DeleteForm id={item.identificacion}/>
                    </td>
                </tr>
            )
            )
          }
        </tbody>
      </table>
    </section>
    </main>
  );
}
export default Home;
