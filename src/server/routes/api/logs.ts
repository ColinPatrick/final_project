import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request to fetch all film logs for a given user
router.get('/:userid', async (req, res) => {

    const userid = Number(req.params.userid); 

    try {
        const logs = await db.Logs.allUserLogs(userid);
        res.json(logs);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request to add a new film log
router.post('/', async (req, res) => {
    
    const logDTO = req.body;

    try {
        const result = await db.Logs.newLog(logDTO);
        res.json({msg: 'You created a new log!', result});
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request to remove a log by its id
router.delete('/:logid', async (req, res) => {

    const logid = Number(req.params.logid);

    try {
        const result = await db.Logs.removeLog(logid);
        res.json({ msg: `You destroyed log${logid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;