// router/user/index.js
import { Router } from 'express';
import { loginUser } from './controllers/loginUser.js';
import { register } from './controllers/register.js';
import { updateUser } from './controllers/updateUser.js';
import { getUsers } from './controllers/getUsers.js';
import { deleteUser } from './controllers/deleteUser.js'
import { getUserEdit } from './controllers/getUserEdit.js';

const router = Router();

router.get('/', getUsers);
router.get('/v/:id', getUserEdit)
router.post('/login', loginUser);
router.post('/register', register);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router };
