//Importaciones
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditForm = () => {
  //Estados
  const [formData, setFormData] = useState({
    identificacion: "",
    nombre: "",
    usuario: "",
    clave: "",
  });

  const navigate = useNavigate()

  //api
  const url = `http://localhost:3001/edit/${formData.identificacion}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const apiEdit = async () => {
    try {
      await fetch(url, options)
        .then( response => {
          if (!response.ok) {
            Swal.fire({
              title: "Error Al Editar El Usuario!",
              text: "Por favor, verifique los datos.",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          }
          return response.json();
        })
        .then( data => {
          console.log("Usuario editado exitosamente:", data);
          Swal.fire({
            title: "Usuario Editado Con Exito!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error Al Editar El Usuario!",
        text: `Algo Salio Mal, ${error}`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  //funciones
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    apiEdit();
    navigate('/home')

  };

  //vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="identificacion">Identificación:</label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="clave">Contraseña:</label>
            <input
              type="password"
              id="clave"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-regristrar">
            Editar
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditForm;
