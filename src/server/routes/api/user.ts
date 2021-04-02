import { Router } from 'express';
import db from '../../db';
import usercontentRouter from './usercontent';

const router = Router();

router.get('/:userid', async (req, res) => {

    const userid = Number(req.params.userid);

    try {
        const [author] = await db.User.findOneById(userid);
        res.json(author);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
})

router.use('/usercontent', usercontentRouter);

export default router;