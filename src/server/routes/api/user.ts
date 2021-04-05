import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request that fetches a single user by their id
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

export default router;