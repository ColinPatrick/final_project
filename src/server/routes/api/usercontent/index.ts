import { Router } from 'express';
import userblogsRouter from './userblogs';
import userreviewsRouter from './userreviews';

const router = Router();

router.use('/userblogs', userblogsRouter);
router.use('/userreviews', userreviewsRouter);

export default router;