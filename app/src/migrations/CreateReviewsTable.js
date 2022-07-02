import {execQuery} from './utils.js';
import DbConnection from '../database/DbConnection.js';

export function createReviewsTable() {
    const sql = `CREATE TABLE reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        score INT,
        title VARCHAR(255),
        summary TEXT(4000),
        book INT NOT NULL,
        FOREIGN KEY (book) REFERENCES books(id)
    )`;
    execQuery(sql, DbConnection.db);
}

export function dropReviewsTable() {
    const sql = 'DROP TABLE IF EXISTS reviews';
    execQuery(sql, DbConnection.db);
}
