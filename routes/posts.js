import { Router } from 'express';
import postsController from '../controllers/postsController';
import verifyToken from './verifyToken';
const router = Router();

router.get('/', postsController.getPosts);
router.post('/', verifyToken, postsController.createPost);
router.get('/:postId', postsController.getPost);
router.patch('/:postId', verifyToken, postsController.updatePost);
router.delete('/:postId', verifyToken, postsController.deletePost);

export default router;