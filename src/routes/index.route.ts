import { Router } from 'express';
import authRoute from './auth.route';
import noteRoute from './notes.router';

const router = Router();
router.use('/auth', authRoute);
router.use('/notes', noteRoute);
export default router;
