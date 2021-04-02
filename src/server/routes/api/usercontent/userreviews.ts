import { Router } from 'express';
import db from '../../../db';

const router = Router();
// get request to fetch all the revies from a single user's id
router.get('/:userid', async (req, res) => {

    const userid = Number(req.params.userid); 

    try {
        const reviews = await db.Reviews.allUserReviews(userid);
        res.json(reviews);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});


export default router;