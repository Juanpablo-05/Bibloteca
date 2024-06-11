// router/user/updateUser.js
import { connection } from '../../models/db.js';

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { id, nombre, usuario, clave } = req.body;

  connection.query(
    'UPDATE usuarios SET id = ?, nombre = ?, usuario = ?, clave = ? WHERE id = ?',
    [id, nombre, usuario, clave, userId],
    (error) => {
      if (error) {
        console.log('Error al editar el usuario:', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    }
  );
};
