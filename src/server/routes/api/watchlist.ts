import { Router } from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = Router();
// request handler to be inserted into each request in order to check whether the request is being made by a logged in user and approving/rejecting the request accordingly
const isLoggedIn: RequestHandler = (req, res, next) => {
    if(!req.user) {
        return res.sendStatus(401);
    } else {
        return next();
    }
};
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
router.post('/', isLoggedIn, async (req, res) => {
    
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
router.delete('/:logid', isLoggedIn, async (req, res) => {

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