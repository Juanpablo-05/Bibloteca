import React from 'react'
import { FaTrash } from "react-icons/fa6";


function DeleteForm( { id, onDelete } ) {

    const Delete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/eliminar/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              // Notificar al componente padre sobre la eliminación exitosa
              onDelete(id);
            } else {
              console.error('Error al eliminar el usuario:', response.statusText);
            }
          } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
          }
    }

  return (
    <button onClick={Delete}>
        <FaTrash />
    </button>
  )
}

export default DeleteForm