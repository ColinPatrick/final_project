import { Query } from '../index';
// query to locate a specific author/user by email
const findOneByEmail = async (email: string) => Query(`SELECT * FROM User WHERE email = ? LIMIT 1`, [email]);
// query to find a specific author/user by id
const findOneById = async (userid: number) => Query(`SELECT * FROM User WHERE id = ? LIMIT 1`, [userid]);
// query to add a new author/user to the db
const addUser = async ( user: { username: string, email: string, password: string }) => Query('INSERT INTO User SET ?', user);
// all queries exported for future use
export default {
    findOneByEmail,
    findOneById,
    addUser
}