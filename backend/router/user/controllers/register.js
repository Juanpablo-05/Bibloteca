// router/user/register.js
import { connection } from '../../models/db.js';

export const register = (req, res) => {
  const { id, nombre, usuario, clave } = req.body;

  connection.query(
    'INSERT INTO usuarios (id, nombre, usuario, clave) VALUES (?, ?, ?, ?)',
    [id, nombre, usuario, clave],
    (error) => {
      if (error) {
        console.log('Error al registrar el usuario', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      res.status(200).json({ message: 'Registro exitoso' });
    }
  );
};
