import { Router } from 'express';
import zonesController from '../controllers/zonesController';
import verifyToken from './verifyToken';
const router = Router();

router.get('/', zonesController.getZones);
router.post('/', verifyToken, zonesController.createZone);
router.get('/:zoneId/posts/', zonesController.getZonePosts);
router.delete('/:zoneId', verifyToken, zonesController.deleteZone);

export default router;