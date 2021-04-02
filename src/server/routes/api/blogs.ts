import { Router } from 'express';
import db from '../../db';

const router = Router();
// get request to fetch a single blog by its id
router.get('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid); 

    try{
        const [blog] = await db.Blogs.oneBlog(blogid);
        res.json(blog);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request to add a new blog to the blogs table
router.post('/', async (req, res) => {

    const blogDTO = req.body;

    try {
        const result = await db.Blogs.insertBlog(blogDTO);
        res.json({ msg: 'You made a blog!', id: result.insertId });
    } catch(e) {
        console.log(req.body);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// put request to update/edit data in the blog of the given id
router.put('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid);
    const editBlogDTO = req.body;

    try {
        const result = await db.Blogs.updateBlog(editBlogDTO, blogid);
        res.json({ msg: `You edited blog${blogid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request to remove a blog of a given id
router.delete('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid);

    try {
        const result = await db.Blogs.removeBlog(blogid);
        res.json({ msg: `You destroyed blog${blogid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;