import { Router } from 'express';
import postsController from '../controllers/postsController';
import verifyToken from './verifyToken';
import upload from "../utils/multer";
const router = Router();

router.get('/', postsController.getPosts);
router.post('/', verifyToken, upload.single("image"), postsController.createPost);
router.get('/:postId', postsController.getPost);
router.patch('/:postId', verifyToken, postsController.updatePost);
router.delete('/:postId', verifyToken, postsController.deletePost);

export default router;