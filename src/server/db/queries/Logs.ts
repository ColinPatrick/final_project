import { Query } from '../';
// all queries for the film logs table

// query to get all film logs for a user
const allUserLogs = (userid: number) => Query('SELECT Logs.*, Films.* FROM Logs JOIN Films on Films.filmid = Logs.filmid WHERE userid = ?', [userid]);
// query to add a new film log
const newLog = (newLog: { userid: number, filmid: number }) => Query('INSERT INTO Logs SET ?', newLog);
// query to remove a log
const removeLog = (id: number) => Query('DELETE FROM Logs WHERE id = ?', [id]);
// all queries are exported to be used on the logs api route
export default {
    allUserLogs,
    newLog,
    removeLog
}