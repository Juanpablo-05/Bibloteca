import { connection } from "../models/db";

//obtener todos los prestamos

export const getAllPrestamos = (req, res) => {
    connection.query('SELECT * FROM prestamo_libro', (error, results) => {
      if (error) {
        console.log('Error al obtener los usuarios', error);
        res.status(500).send('Error en el servidor');
        return;
      }
  
      res.status(200).json(results);
    });
};