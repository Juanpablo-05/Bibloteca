//importaciones
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditFormBook() {
  //hooks react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  //estados
  const [book, setBook] = useState({
    nombre: "",
    autor: "",
  });

  //api
  const bookUrl = `http://localhost:3001/libros/l/${id}`;

  const editUrl = `http://localhost:3001/libros/${id}`;

  useEffect(() => {
    fetchUserData();
  }, [id]);

  //funciones
  const fetchUserData = async () => {
    try {
      const response = await fetch(bookUrl);
      const data = await response.json();
       setBook(data);
      console.log(book);
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevData) => ({
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
        body: JSON.stringify(book),
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
      navigate('/home/libros');

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

  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Editar Libro</h2>
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
          <button type="submit" className="btn-registrar">
            Editar
          </button>
        </form>
      </div>
    </main>
  );
}

export default EditFormBook