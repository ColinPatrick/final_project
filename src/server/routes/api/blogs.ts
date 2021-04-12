import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request to fetch all blogs from a specific user
router.get('/', async (req, res) => {
    // const userid = Number(req.params.userid); 
    console.log("test")
    try {
        const blogs = await db.Blogs.allBlogs();
        res.json(blogs);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;