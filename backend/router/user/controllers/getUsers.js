// router/user/getUsers.js
import { connection } from '../../models/db.js';

export const getUsers = (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.log('Error al obtener los usuarios', error);
      res.status(500).send('Error en el servidor');
      return;
    }

    res.status(200).json(results);
  });
};
