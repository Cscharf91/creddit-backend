import { Router } from 'express';
import votesController from '../controllers/votesController';
import verifyToken from './verifyToken';
const router = Router();

router.post('/', verifyToken, votesController.createVote);
router.delete('/:voteId', verifyToken, votesController.updateVote);
router.delete('/:voteId', verifyToken, votesController.deleteVote);
router.get('/:postId', verifyToken, votesController.getPostVotes);
router.get('/:commentId', verifyToken, votesController.getCommentVotes);

export default router;