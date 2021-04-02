import { Router } from 'express';
import * as passport from 'passport';
import userRouter from './user';
import blogsRouter from './blogs';
import logsRouter from './logs';
import reviewsRouter from './reviews';
import watchlistRouter from './watchlist';

const router = Router();
// utilizes the bearer passport strategy for all api routes below
// router.use((req, res, next) => {
//     passport.authenticate('bearer', { session: false }, (err, user, info) => {
//         if(user) req.user = user;
//         return next();
//     })(req, res, next);
// })

router.use('/user', userRouter);
router.use('/blogs', blogsRouter);
router.use('/logs', logsRouter);
router.use('/reviews', reviewsRouter);
router.use('/watchlist', watchlistRouter);

export default router;