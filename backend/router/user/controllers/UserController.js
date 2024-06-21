import {connection} from '../../../models/db.js'

//login
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

//crear
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

//editar
export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { nombre, usuario, clave } = req.body;
  
    connection.query(
      'UPDATE usuarios SET nombre = ?, usuario = ?, clave = ? WHERE id = ?',
      [nombre, usuario, clave, userId],
      (error) => {
        if (error) {
          console.log('Error al editar el usuario:', error);
          res.status(500).send('Error en el servidor');
          return;
        }
  
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      }
    );
};

//obtener un unico usuario
export const getUserEdit = (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM usuarios WHERE id =?", 
      [id], 
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error en el servidor');
        } else {
          if (result.length > 0) {
            res.status(200).json(result[0]); // Envía el primer resultado como JSON
          } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
          }
        }
        
    })
}

//obtener usuario
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

//eliminar
export const deleteUser = (req, res) => {
    const userId = req.params.id;
  
    connection.query(
      'DELETE FROM usuarios WHERE id = ?',
      [userId],
      (error, results, fields) => {
        if (error) {
          console.error('Error al eliminar el usuario:', error);
          res.status(500).send('Error en el servidor');
          return;
        }
  
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
      }
    );
}
