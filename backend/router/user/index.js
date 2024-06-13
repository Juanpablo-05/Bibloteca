// router/user/index.js
import { Router } from 'express';
import {
    getUsers,
    getUserEdit,
    loginUser,
    register,
    updateUser,
    deleteUser,
} from './controllers/UserController.js'


const router = Router();

router.get('/', getUsers);
router.get('/v/:id', getUserEdit)
router.post('/login', loginUser);
router.post('/register', register);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router };
