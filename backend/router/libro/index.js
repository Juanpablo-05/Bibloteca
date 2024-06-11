// router/libro/index.js
import { Router } from 'express';
import { addBook } from './controllers/addBook.js';
import { getBooks } from './controllers/getBooks.js';
import { updateBook } from './controllers/updateBook.js';
import { deleteBook } from './controllers/deleteBook.js';
import { getEditBook } from './controllers/getBookEdit.js';

const router = Router();

router.get('/', getBooks);
router.get('/l/:id', getEditBook);
router.post('/add', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export { router };
