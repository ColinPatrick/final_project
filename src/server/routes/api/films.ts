import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/:filmid', async (req, res) => {

    const filmid = Number(req.params.filmid);

    try {
        const result = await db.Films.checkFilm(filmid);
        if (result[0]) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch(e) {
        console.log(req.body);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

// post request to add a new blog to the blogs table
router.post('/', async (req, res) => {

    const filmDTO = req.body;

    try {
        const result = await db.Films.addToFilms(filmDTO);
        console.log(req.body.filmid);
        console.log(filmDTO);
        res.json({ msg: 'You made a film!', id: result.insertId });
    } catch(e) {
        console.log(req.body);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;