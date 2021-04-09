import { Router } from 'express';
import db from '../../db';

const router = Router();

// get request to fetch all film logs for a given user
router.get('/:logid', async (req, res) => {

    const logid = Number(req.params.logid); 

    try {
        const [logs] = await db.Logs.singleLog(logid);
        res.json(logs);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;