// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as userRouter } from './router/user/index.js';
import { router as libroRouter } from './router/libro/index.js';

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/usuario', userRouter);
app.use('/libro', libroRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
