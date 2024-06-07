const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adsi'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para la autenticación de usuarios
app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;

  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?',
    [usuario, clave],
    (error, results, fields) => {
      if (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error de servidor' , error);
        return;
      }

      if (results.length > 0) {
        res.status(200).json({ message: 'Login exitoso' });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    }
  );
});

// Ruta para la creación de usuarios
app.post('/register', (req, res) => {
  const { identificacion, nombre, usuario, clave } = req.body;

  connection.query(
    'INSERT INTO usuarios (identificacion, nombre, usuario, clave) VALUES (?, ?, ?, ?)',
    [identificacion, nombre, usuario, clave],
    (error, results, fields) => {
      if(error){
        console.log('error al registrar el usuario', error);
        res.status(500).send('error en el servidor')
        return;
      }

      if (!error){
        res.status(200).json({ message: 'Registro exitoso' });
      }else{
        res.status(400).json({ message: 'Credenciales inválidas' });
      }
    }
  )
})

//ruta para tomar todos los usuarios
app.get('/usuarios', (req, res) => {
  connection.query(
    'SELECT * FROM usuarios',
    (error, results, fields) => {
      if(error){
        console.log('error al obtener los usuarios', error);
        res.status(500).send('error en el servidor')
      }

      if(!error){
        res.status(200).json(results);
      }
    }
  )
})

//ruta para editar usuario 
app.put('/usuario/:id', (req, res) => {
  const userId = req.params.id;
  const { identificacion, nombre, usuario, clave } = req.body;

  connection.query(
    'UPDATE usuarios SET identificacion = ?, nombre = ?, usuario = ?, clave = ? WHERE identificacion = ?',
    [identificacion, nombre, usuario, clave, userId],
    (error, results, fields) => {
      if(error){
        console.log('Error al editar el usuario:', error);
        res.status(500).send('Error en el servidor');
        return;
      }

      if(!error){
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      }
    }
  );
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
