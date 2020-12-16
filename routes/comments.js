import { Router } from 'express';
import commentsController from '../controllers/commentsController';
import verifyToken from './verifyToken';
const router = Router();

router.get('/', commentsController.getComments);
router.post('/', verifyToken, commentsController.createComment);
router.get('/:commentId', commentsController.getComment);
router.patch('/:commentId', verifyToken, commentsController.updateComment);
router.delete('/:commentId', verifyToken, commentsController.deleteComment);

export default router;