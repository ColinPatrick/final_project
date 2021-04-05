import { Router } from 'express';
import * as passport from 'passport';
import userRouter from './user';
import blogsRouter from './blogs';
import blogRouter from './blog';
import logsRouter from './logs';
import reviewsRouter from './reviews';
import reviewRouter from './review';
import watchlistRouter from './watchlist';
import tokenRouter from './token';

const router = Router();
// utilizes the bearer passport strategy for all api routes below
router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/user', userRouter);
router.use('/blogs', blogsRouter);
router.use('/blog', blogRouter);
router.use('/logs', logsRouter);
router.use('/reviews', reviewsRouter);
router.use('/review', reviewRouter);
router.use('/watchlist', watchlistRouter);
router.use('/token', tokenRouter);


export default router;