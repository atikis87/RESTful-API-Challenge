import {execQuery} from './utils.js';
import DbConnection from '../database/DbConnection.js';

export function createUsersTable() {
    const sql = `CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255),
        avatar VARCHAR(255),
        role ENUM('administrator', 'reviewer') NOT NULL,
        password  VARCHAR(255)
    )`;
    execQuery(sql, DbConnection.db);
}

export function dropUsersTable() {
    const sql = 'DROP TABLE IF EXISTS users';
    execQuery(sql, DbConnection.db);
}
