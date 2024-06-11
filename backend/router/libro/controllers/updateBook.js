// router/libro/updateBook.js
import { connection } from '../../../models/db.js';

export const updateBook = (req, res) => {
  const bookId = req.params.id;
  const { nombre, autor } = req.body;

  connection.query(
    'UPDATE libros SET nombre = ?, autor = ? WHERE id = ?',
    [nombre, autor, bookId],
    (error) => {
      if (error) {
        console.log('Error al editar el libro:', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      res.status(200).json({ message: 'Libro actualizado exitosamente' });
    }
  );
};
