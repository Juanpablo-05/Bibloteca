// models/db.js
import mysql from 'mysql2';

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '',      
  database: 'adsi'   
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1); 
  } else {
    console.log('Conexión a la base de datos MySQL establecida');
  }
});

// Exportar la conexión
export { connection };
