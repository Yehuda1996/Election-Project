import express from 'express';
import {register, login, getUserById} from '../controllers/userController';
import { verifyToken } from '../middleware/verifyMiddleware';



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUserById);


export default router