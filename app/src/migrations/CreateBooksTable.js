import { execQuery} from './utils.js';
import DbConnection from '../database/DbConnection.js';

export function createBooksTable() {
    const sql = `CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT(4000),
        cover VARCHAR(255),
        author INT NOT NULL,
        genre INT NOT NULL,
        FOREIGN KEY (author) REFERENCES authors(id),
        FOREIGN KEY (genre) REFERENCES genre(id)
    )`;
    execQuery(sql, DbConnection.db);
}

export function dropBooksTable() {
    const sql = 'DROP TABLE IF EXISTS books';
    execQuery(sql, DbConnection.db);
}
