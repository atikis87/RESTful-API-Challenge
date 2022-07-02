import {createAuthorTable, dropAuthorTable} from './CreateAuthorTable.js';
import {createGenreTable, dropGenreTable} from './CreateGenreTable.js';
import {createUsersTable, dropUsersTable} from './CreateUserTable.js';
import {createBooksTable, dropBooksTable} from './CreateBooksTable.js';
import {createReviewsTable, dropReviewsTable} from './CreateReviewsTable.js';

export function up(req, res) {
    createUsersTable();
    createAuthorTable();
    createGenreTable();
    createBooksTable();
    createReviewsTable();
    res.sendResponse(200, 'Created all tables!');
}

export function down(req, res) {
    dropReviewsTable();
    dropBooksTable();
    dropAuthorTable();
    dropGenreTable();
    dropUsersTable();
    res.sendResponse(200, 'Deleted all tables!');
}