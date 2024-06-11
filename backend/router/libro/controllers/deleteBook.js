// router/libro/deleteBook.js
import { connection } from '../../../models/db.js';

export const deleteBook = (req, res) => {
  const bookId = req.params.id;

  connection.query(
    'DELETE FROM libros WHERE id = ?',
    [bookId],
    (error) => {
      if (error) {
        console.log('Error al eliminar el libro:', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      res.status(200).json({ message: 'Libro eliminado exitosamente' });
    }
  );
};
