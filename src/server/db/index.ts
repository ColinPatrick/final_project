import * as mysql from 'mysql';
import config from '../config';

// mysql pool created and connection stored
const pool = mysql.createPool(config.mysql); 
// mysql Query is outlined here
export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        
        const sql = mysql.format(query, values);

        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
// all queries are imported
import User from './queries/User';
import accesstokens from './queries/accesstokens';
import Blogs from './queries/Blogs';
import Logs from './queries/Logs';
import Watchlist from './queries/Watchlist';
import Films from './queries/Films';

// exported for future use
export default {
    User,
    accesstokens,
    Blogs,
    Logs,
    Watchlist,
    Films
}