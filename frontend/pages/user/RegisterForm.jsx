//Importaciones
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterForm = () => {
  //Estados
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    usuario: "",
    clave: "",
  });

  const navigate = useNavigate()

  //api
  const url = `http://localhost:3001/usuario/register`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const apiRegister = async () => {
    try {
      await fetch(url, options)
        .then( response => {
          if (!response.ok) {
            Swal.fire({
              title: "Error Al Registar Al Usuario!",
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
            title: "Usuario Registrado Con Exito!",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        })
    } catch (error) {}
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
    apiRegister();
    navigate('/home')

  };

  //vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="id">Identificación:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
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
            Registrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
