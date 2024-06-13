//Importaciones
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreatePrestamo = () => {
  //Estados
  const [prestamos, setPrestamos] = useState({
    Id_UsuFK: "",
    Id_LibroFK: "",
    Fecha_prestamo: "",
    Fecha_Devolucion: "" || "" || null ,
  });

  const navigate = useNavigate()

  //api
  const url = `http://localhost:3001/prestamos`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamos),
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
    } catch (error) {
      console.error('Error al registrar el préstamo:', error);
      Swal.fire({
        title: "Error Al Registar El Libro!",
        text: "Por favor, verifique los datos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  //funciones
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + ': ' + value);
    setPrestamos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", prestamos);
    apiRegister();
    navigate('/home/prestamos')

  };

  //vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
        
          <div className="input-container">
            <label htmlFor="Id_UsuFK">Id usuario:</label>
            <input
              type="text"
              id="Id_UsuFK"
              name="Id_UsuFK"
              value={prestamos.Id_UsuFK}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="Id_LibroFK">Id Libro:</label>
            <input
              type="text"
              id="Id_LibroFK"
              name="Id_LibroFK"
              value={prestamos.Id_LibroFK}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="autor">Fecha prestamo</label>
            <input
              type="date"
              id="Fecha_prestamo"
              name="Fecha_prestamo"
              value={prestamos.Fecha_prestamo}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="autor">Autor:</label>
            <input
              type="date"
              id="Fecha_Devolucion"
              name="Fecha_Devolucion"
              value={prestamos.Fecha_Devolucion || '' }
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

export default CreatePrestamo;
