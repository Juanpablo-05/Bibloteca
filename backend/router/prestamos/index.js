import { Router } from 'express';
import {
    getAllPrestamos,
    getPrestamo,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} from './controllers/PrestamoController.js'

const router = Router();

router.get('/', getAllPrestamos)
router.get('/p/:id', getPrestamo)
router.post('/', createPrestamo)
router.put('/:id', updatePrestamo)
router.delete('/:id', deletePrestamo)

export {router} 