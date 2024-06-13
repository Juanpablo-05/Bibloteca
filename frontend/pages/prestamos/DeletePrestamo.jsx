//importaciones
import React from "react";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function DeletePrestamo({ id, onDelete }) {
  //funciones
  const Delete = async () => {
    try {
      Swal.fire({
        title: "Estas Seguro De Eliminar Este Prestamo?",
        text: "Esto no se podra revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:3001/prestamos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            onDelete(id);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Hubo un problema al eliminar el usuario.",
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };
  //vista
  return (
    <button onClick={Delete} className="btn-eliminar">
      <FaTrash />
    </button>
  );
}
