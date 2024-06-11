import { connection } from "../../models/db.js";

export const deleteUser = (req, res) => {
    const userId = req.params.id;
  
    connection.query(
      'DELETE FROM usuarios WHERE id = ?',
      [userId],
      (error, results, fields) => {
        if (error) {
          console.error('Error al eliminar el usuario:', error);
          res.status(500).send('Error en el servidor');
          return;
        }
  
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
      }
    );
}
