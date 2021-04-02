import { Query } from '../';
// all queries for the reviews table
// a query to call all the reviews for a certain user
const allUserReviews = (userid: number) => Query('SELECT Reviews.*, User.username FROM Reviews JOIN User on User.id = Reviews.userid WHERE userid = ?', [userid]);
// a query to call an individual Review
const oneReview = (id: number) => Query('SELECT Reviews.*, User.username FROM Reviews JOIN User on User.id = Reviews.userid WHERE Reviews.id = ?', [id]);
// a query to write a new Review
const insertReview = (newReview: { userid: number; filmid: number; review: string; }) => Query('INSERT INTO Reviews SET ?', newReview);
// a query to update/edit the contents of a Review
const updateReview = (editReview: { review: string }, id: number) => Query('UPDATE Reviews SET ? WHERE id = ?', [editReview, id]);
// a query that deletes a specific Review
const removeReview = (id: number) => Query('DELETE FROM Reviews WHERE id = ?', [id]);
//all queries are exported to be used in the reviews api route

export default {
    allUserReviews,
    oneReview,
    insertReview,
    updateReview,
    removeReview
}