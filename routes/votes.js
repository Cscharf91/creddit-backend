import { Router } from 'express';
import votesController from '../controllers/votesController';
import verifyToken from './verifyToken';
const router = Router();

router.post('/', verifyToken, votesController.createVote);
router.patch('/:voteId', verifyToken, votesController.updateVote);
router.delete('/:voteId', verifyToken, votesController.deleteVote);
router.get('/posts/:postId', votesController.getPostVotes);
router.get('/comments/:commentId', votesController.getCommentVotes);

export default router;