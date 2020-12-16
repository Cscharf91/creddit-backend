import { Router } from 'express';
import usersController from '../controllers/usersController';
const router = Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:userId', usersController.getUser);

export default router;