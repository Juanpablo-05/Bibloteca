// router/libro/index.js
import { Router } from 'express';
import {
    getBooks,
    getEditBook,
    addBook,
    updateBook,
    deleteBook,
} from './controllers/LibroController.js'

const router = Router();

router.get('/', getBooks);
router.get('/l/:id', getEditBook);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export { router };
