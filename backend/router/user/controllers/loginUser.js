// router/user/login.js
import { connection } from '../../models/db.js';

export const loginUser = (req, res) => {
  const { usuario, clave } = req.body;

  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?',
    [usuario, clave],
    (error, results) => {
      if (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error de servidor');
        return;
      }

      if (results.length > 0) {
        res.status(200).json({ message: 'Login exitoso' });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    }
  );
};
