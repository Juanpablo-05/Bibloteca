import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const EditForm = () => {
  // Estados
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    clave: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  //hooks react router dom
  const { id } = useParams();
  const navigate = useNavigate();

  //api
  const userUrl = `http://localhost:3001/usuario/u/${id}`;

  const editUrl = `http://localhost:3001/usuario/${id}`;

  useEffect(() => {
    fetchUserData();
  }, [id]);

  //funciones
  const fetchUserData = async () => {
    try {
      const response = await fetch(userUrl);
      const data = await response.json();
      setFormData(data);
      console.log(formData);
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error Al Editar El Usuario!",
          text: "Por favor, verifique los datos.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return;
      }

      const data = await response.json();
      console.log("Usuario editado exitosamente:", data);
      Swal.fire({
        title: "Usuario Editado Con Exito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/home/usuarios");
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      Swal.fire({
        title: "Error Al Editar El Usuario!",
        text: `Algo Salio Mal, ${error}`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  // Vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2 className="title-edit">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="clave">Contraseña:</label>
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                id="clave"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-registrar">
            Editar
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditForm;
