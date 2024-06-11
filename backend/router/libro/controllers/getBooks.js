// router/libro/getBooks.js
import { connection } from '../../../models/db.js';

export const getBooks = (req, res) => {
  connection.query('SELECT * FROM libros', (error, results) => {
    if (error) {
      console.log('Error al obtener los libros', error);
      res.status(500).send('Error en el servidor');
      return;
    }

    res.status(200).json(results);
  });
};
