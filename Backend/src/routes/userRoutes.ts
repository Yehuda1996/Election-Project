import express from 'express';
import {register, login, getUserById} from '../controllers/userController';
import { errorHandler } from '../middleware/errorHandler';



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user');


export default router