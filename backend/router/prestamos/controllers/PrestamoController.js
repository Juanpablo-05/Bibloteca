import { connection } from "../../../models/db.js";

//obtener todos los prestamos
export const getAllPrestamos = (req, res) => {
    connection.query('SELECT prestamo_libro.id,libros.nombre AS nombre_libro,usuarios.nombre AS nombre_usuario,prestamo_libro.Fecha_prestamo,prestamo_libro.Fecha_Devolucion FROM prestamo_libro INNER JOIN usuarios ON prestamo_libro.Id_UsuFK = usuarios.id INNER JOIN libros ON prestamo_libro.Id_LibroFK = libros.id;', 
     (error, results) => {
      if (error) {
        console.log('Error al obtener los usuarios', error);
        res.status(500).send('Error en el servidor');
        return;
      }
  
      res.status(200).json(results);
    });
};

//obtener un unico prestamo
export const getPrestamo = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM prestamo_libro WHERE id =?', [id], (error, results) => {
    if (error) {
      console.log('Error al obtener el prestamo', error);
      res.status(500).send('Error en el servidor');
      return;
    }
  
    res.status(200).json(results);
  });
}

//crear un prestamo
export const createPrestamo = (req, res) => {
  const { Id_UsuFK, Id_LibroFK, Fecha_prestamo, Fecha_Devolucion } = req.body;
  connection.query('INSERT INTO prestamo_libro (Id_UsuFK, Id_LibroFK, Fecha_prestamo, Fecha_Devolucion) VALUES (?, ?, ?, ?)', 
    [Id_UsuFK, Id_LibroFK, Fecha_prestamo, Fecha_Devolucion], 
    (error, results) => {
    if (error) {
      console.log('Error al crear el prestamo', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    if(!error){
      res.status(201).json({
        message: 'Prestamo creado correctamente'
      });
    }
  });
}

//actualizar un prestamo
export const updatePrestamo = (req, res) => {
  const prestamoId = req.params.id
  const { Id_UsuFK, Id_LibroFK, Fecha_prestamo, Fecha_Devolucion } = req.body;

  connection.query('UPDATE prestamo_libro SET Id_UsuFK =?, Id_LibroFK =?, Fecha_prestamo =?, Fecha_Devolucion =? WHERE id =?', 
    [Id_UsuFK, Id_LibroFK, Fecha_prestamo, Fecha_Devolucion, prestamoId], 
    (error, results) => {
    if (error) {
      console.log('Error al actualizar el prestamo', error);
      res.status(500).send('Error en el servidor');
      return;
    }
  
    if(!error){
      res.status(200).json({
        message: 'Prestamo actualizado correctamente'
      });
    }
  });
}

//eliminar un prestamo

export const deletePrestamo = (req, res) => {
  const prestamoId = req.params.id
  connection.query('DELETE FROM prestamo_libro WHERE id =?', 
    [prestamoId], 
    (error, results) => {
    if (error) {
      console.log('Error al eliminar el prestamo', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    
    if(!error){
      res.status(200).json({
        message: 'Prestamo eliminado correctamente'
      });
    }
  });
}