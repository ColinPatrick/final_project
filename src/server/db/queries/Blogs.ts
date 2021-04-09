import { Query } from '../';
// all queries for the blogs table

// a query to call all the blogs for a certain user
const allUserBlogs = (userid: number) => Query('SELECT Blogs.*, User.username FROM Blogs JOIN User on User.id = Blogs.userid WHERE userid = ? ORDER BY Blogs.id DESC', [userid]);
// a query to call an individual blog
const oneBlog = (id: number) => Query('SELECT Blogs.*, User.username FROM Blogs JOIN User on User.id = Blogs.userid WHERE Blogs.id = ?', [id]);
// a query to write a new blog
const insertBlog = (newBlog: { userid: number; title: string; content: string; }) => Query('INSERT INTO Blogs SET ?', newBlog);
// a query to update/edit the contents of a blog
const updateBlog = (editBlog: {title: string; content: string }, id: number) => Query('UPDATE Blogs SET ? WHERE id = ?', [editBlog, id]);
// a query that deletes a specific blog
const removeBlog = (id: number) => Query('DELETE FROM Blogs WHERE id = ?', [id]);
//all queries are exported to be used in the blogs api route
export default {
    allUserBlogs,
    oneBlog,
    insertBlog,
    updateBlog,
    removeBlog
}