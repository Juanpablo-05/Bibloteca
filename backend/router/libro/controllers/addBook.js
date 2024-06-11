// router/libro/addBook.js
import { connection } from '../../../models/db.js';

export const addBook = (req, res) => {
  const { nombre, autor } = req.body;

  connection.query(
    'INSERT INTO libros (nombre, autor) VALUES (?, ?)',
    [nombre, autor],
    (error) => {
      if (error) {
        console.log('Error al agregar el libro', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      res.status(200).json({ message: 'Libro agregado exitosamente' });
    }
  );
};
