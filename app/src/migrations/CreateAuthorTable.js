import {execQuery} from './utils.js';
import DbConnection from '../database/DbConnection.js';

export function createAuthorTable() {
    const sql = `CREATE TABLE authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )`;
    execQuery(sql, DbConnection.db);
}

export function dropAuthorTable() {
    const sql = 'DROP TABLE IF EXISTS authors';
    execQuery(sql, DbConnection.db);
}
