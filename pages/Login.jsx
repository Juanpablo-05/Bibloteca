//Importaciones
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

function Login() {
  //Estados
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //url api
  const urlLogin = "http://localhost:3001/login";

  //funciones
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, clave: password }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Inicio de sesión Exitoso!",
          text: "sera redirigido a la pagina principal",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/home");
          }
        });
      }

      if (response.status === 401) {
        Swal.fire({
          title: "Error al iniciar sesión",
          text: "Las credenciales no coinciden. Por favor, verifique los datos.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } catch (e) {
      setError("Error de servidor");
      Swal.fire({
        title: "Error al iniciar sesión!",
        text: `Algo salio mal, ${error}...`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  //vista
  return (
    <main className="main-login">
      <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <div className="label-grup">
            <FaUser />
            <label htmlFor="username" className="label-form">
              Usuario:
            </label>
          </div>
          <input
            className="input-form"
            type="text"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="label-grup">
            <FaKey />
            <label htmlFor="password" className="label-form">
              Contraseña:
            </label>
          </div>
          <div className="password">
            <input
              className="input-form"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-form">
          Iniciar sesión
        </button>
      </form>
    </div>
    </main>
  );
}

export default Login;
