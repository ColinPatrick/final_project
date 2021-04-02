import { Router } from 'express';
import db from '../../../db';

const router = Router();

router.get('/:userid', async (req, res) => {

    const userid = Number(req.params.userid); 

    try {
        const blogs = await db.Blogs.allUserBlogs(userid);
        res.json(blogs);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});


export default router;