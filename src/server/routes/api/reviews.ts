import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request to fetch a single review by its id
router.get('/:reviewid', async (req, res) => {

    const reviewid = Number(req.params.reviewid); 

    try{
        const [review] = await db.Reviews.oneReview(reviewid);
        res.json(review);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request to add a new review to the reviews table
router.post('/', async (req, res) => {

    const reviewDTO = req.body;

    try {
        const result = await db.Reviews.insertReview(reviewDTO);
        res.json({ msg: 'You made a review!', id: result.insertId });
    } catch(e) {
        console.log(req.body);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// put request to update/edit data in the review of the given id
router.put('/:reviewid', async (req, res) => {

    const reviewid = Number(req.params.reviewid);
    const editedReviewDTO = req.body;

    try {
        const result = await db.Reviews.updateReview(editedReviewDTO, reviewid);
        res.json({ msg: `You edited review${reviewid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request to remove a review of a given id
router.delete('/:reviewid', async (req, res) => {

    const reviewid = Number(req.params.reviewid);

    try {
        const result = await db.Reviews.removeReview(reviewid);
        res.json({ msg: `You destroyed review${reviewid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;