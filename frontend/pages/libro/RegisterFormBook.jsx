//Importaciones
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterFormBook = () => {
  //Estados
  const [book, setBook] = useState({
    nombre: "",
    autor: "",
  });

  const navigate = useNavigate()

  //api
  const url = `http://localhost:3001/libro/add`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  };

  const apiRegister = async () => {
    try {
      await fetch(url, options)
        .then( response => {
          if (!response.ok) {
            Swal.fire({
              title: "Error Al Registar El Libro!",
              text: "Por favor, verifique los datos.",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          }
          return response.json();
        })
        .then( data => {
          Swal.fire({
            title: "Libro Registrado Con Exito!",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        })
    } catch (error) {}
  };

  //funciones
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", book);
    apiRegister();
    navigate('/home/libros')

  };

  //vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={book.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="autor">Autor:</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={book.autor}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-regristrar">
            Registrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterFormBook;
