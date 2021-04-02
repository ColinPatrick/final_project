import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request to fetch all films logs from a user's watchlist
router.get('/:userid', async (req, res) => {

    const userid = Number(req.params.userid); 

    try {
        const watchlist = await db.Watchlist.getUserWatchlist(userid);
        res.json(watchlist);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request to add a new film to watchlist
router.post('/', async (req, res) => {
    
    const logDTO = req.body;

    try {
        const result = await db.Watchlist.addToWatchlist(logDTO);
        res.json({msg: 'You created a new log!', result});
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request to remove a watchlist film by its watchlist id
router.delete('/:logid', async (req, res) => {

    const logid = Number(req.params.logid);

    try {
        const result = await db.Watchlist.removeFromWatchlist(logid);
        res.json({ msg: `You destroyed watchlist item${logid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;