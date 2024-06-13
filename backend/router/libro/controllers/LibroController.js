import { connection } from "../../../models/db.js";

//añadir
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

//obtener un unico libro
export const getEditBook = (req, res) =>{
    const id = req.params.id
    connection.query(
        'SELECT * FROM libros WHERE id =?', 
        [id], 
        (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({
                message: 'Error en la consulta'
            })
            return
        }
        else{
            res.status(200).json(result)
            return
            
        }
    })
}

//obtener todos los libros
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

//editar libro
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

//eliminar libro
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
  