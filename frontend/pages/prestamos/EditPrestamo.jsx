import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditPrestamo() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Estado
  const [prestamo, setPrestamo] = useState({
    Id_UsuFK: "",
    Id_LibroFK: "",
    Fecha_prestamo: "",
    Fecha_Devolucion: "" || null,
  });
  const [ libros, setLibors ] = useState([]);

  //api

  const prestamoUrl = `http://localhost:3001/prestamos/p/${id}`;
  const editUrl = `http://localhost:3001/prestamos/${id}`;
  const urlLibros = `http://localhost:3001/libros`

  useEffect(() => {
    if (id) {
      fetchPrestamoData();
    }
    apiLibros(urlLibros)
  }, [id]);

  const fetchPrestamoData = async () => {
    try {
      const response = await fetch(prestamoUrl);
      const data = await response.json();
      // Convierte las fechas al formato correcto YYYY-MM-DD para el input tipo date
      setPrestamo({
        ...data,
        Fecha_prestamo: data.Fecha_prestamo ? data.Fecha_prestamo.split('T')[0] : "",
        Fecha_Devolucion: data.Fecha_Devolucion ? data.Fecha_Devolucion.split('T')[0] : "",
      });
    } catch (error) {
      console.error("Error al cargar los datos del Prestamo:", error);
    }
  };

  const apiLibros = async (url) => {
    fetch(urlLibros)
      .then( res => res.json() )
      .then( data => setLibors(data) )
  }

  //funciones
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo((prevData) => ({
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
        body: JSON.stringify(prestamo),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error Al Editar El Prestamo!",
          text: "Por favor, verifique los datos.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return;
      }

      const data = await response.json();
      Swal.fire({
        title: "Prestamo Editado Con Exito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate('/home/prestamos');
    } catch (error) {
      console.error("Error al editar el Prestamo:", error);
      Swal.fire({
        title: "Error Al Editar El Prestamo!",
        text: `Algo Salio Mal, ${error}`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  //vista
  return (
    <main className="main-register">
      <div className="register-container">
        <h2>Editar Prestamo</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="Id_UsuFK">Id Usuario:</label>
            <input
              type="text"
              id="Id_UsuFK"
              name="Id_UsuFK"
              value={prestamo.Id_UsuFK}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="Id_LibroFK">Libro:</label>
            <select
              type="text"
              id="Id_LibroFK"
              name="Id_LibroFK"
              value={prestamo.Id_LibroFK}
              onChange={handleChange}
              required
            >
              <option>Seleccione libro</option>
              {
                libros.map( (items, i) => (
                  <option key={items.id} value={items.id}>{items.nombre}</option>
                ))
              }
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="Fecha_prestamo">Fecha Prestamo:</label>
            <input
              type="date"
              id="Fecha_prestamo"
              name="Fecha_prestamo"
              value={prestamo.Fecha_prestamo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="Fecha_Devolucion">Fecha Devolucion:</label>
            <input
              type="date"
              id="Fecha_Devolucion"
              name="Fecha_Devolucion"
              value={prestamo.Fecha_Devolucion}
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

export default EditPrestamo;
