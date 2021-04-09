import { Query } from '../';
// all queries for the film logs table

// query to get all film logs for a user
const allUserLogs = (userid: number) => Query('SELECT Logs.*, Films.name, Films.poster FROM Logs JOIN Films on Films.filmid = Logs.filmid WHERE userid = ?', [userid]);
// query to get a single log
const singleLog = (logid: number) => Query('SELECT Logs.*, Films.name, Films.poster, User.username FROM Logs INNER JOIN Films on Films.filmid = Logs.filmid INNER JOIN User on User.id = Logs.userid WHERE Logs.id = ?', [logid])
// query to add a new film log
const newLog = (newLog: { userid: number, filmid: number, ratings: number }) => Query('INSERT INTO Logs SET ?', newLog);
// query to remove a log
const removeLog = (id: number) => Query('DELETE FROM Logs WHERE id = ?', [id]);
// a querie to add a new review
const addReview = (newReview: string, id: number) => Query('UPDATE Logs SET review = ? WHERE id = ?', [newReview, id]);
// all queries are exported to be used on the logs api route
export default {
    allUserLogs,
    singleLog,
    newLog,
    removeLog,
    addReview
}