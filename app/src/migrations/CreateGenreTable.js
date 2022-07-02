import {execQuery} from './utils.js';
import DbConnection from '../database/DbConnection.js';

export function createGenreTable() {
    const sql = `CREATE TABLE genre (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )`;
    execQuery(sql, DbConnection.db);
}

export function dropGenreTable() {
    const sql = 'DROP TABLE IF EXISTS genre';
    execQuery(sql, DbConnection.db);
}
