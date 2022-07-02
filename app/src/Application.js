import http from 'http';
import { join } from 'node:path';
import Router from './Router.js';
import {
    handleDeleteUserById,
    handleGetUserById,
    handleGetUsers,
    handlePostUsers,
    handleUpdateUserById
} from './routes/users.js';
import {
    handleDeleteBookById,
    handleGetBookById,
    handleGetBooks,
    handlePostBooks,
    handleUpdateBookById
} from './routes/books.js';
import DbConnection from './database/DbConnection.js';
import {
    handleDeleteAuthorById,
    handleGetAuthorById,
    handleGetAuthors,
    handlePostAuthors,
    handleUpdateAuthorById
} from './routes/authors.js';
import {
    handleDeleteGenreById,
    handleGetGenreById,
    handleGetGenres,
    handlePostGenre,
    handleUpdateGenreById
} from './routes/genre.js';
import {handleGetReviewById, handlePostReviews} from './routes/reviews.js';
import {down, up} from './migrations/index.js';
import {appErrorHandler} from './routes/errorHandler.js';
import {handle404} from './routes/404.js';
import {requiresAdmin} from './authorization/requiresAdmin.js';
import {requiresSelf} from './authorization/requiresSelf.js';

const PORT = 80;

export default class Application {
    constructor() {
        this.router = new Router();
        this.registerRoutes();
    }

    registerRoutes() {
        // Users routes
        this.router
            .get('/users', requiresAdmin, handleGetUsers)
            .get('/users/:id', handleGetUserById)
            .post('/users', handlePostUsers)
            .put('/users/:id', requiresSelf, handleUpdateUserById)
            .delete('/users/:id', handleDeleteUserById);

        // Book routes
        this.router
            .get('/books', handleGetBooks)
            .get('/books/:id', handleGetBookById)
            .post('/books', requiresAdmin, handlePostBooks)
            .put('/books/:id', requiresAdmin, handleUpdateBookById)
            .delete('/books/:id', requiresAdmin, handleDeleteBookById);

        // Author routes
        this.router
            .get('/authors', handleGetAuthors)
            .get('/authors/:id', handleGetAuthorById)
            .post('/authors', requiresAdmin, handlePostAuthors)
            .put('/authors/:id', requiresAdmin, handleUpdateAuthorById)
            .delete('/authors/:id', requiresAdmin, handleDeleteAuthorById);

        // Genre routes
        this.router
            .get('/genre', handleGetGenres)
            .get('/genre/:id', handleGetGenreById)
            .post('/genre', requiresAdmin, handlePostGenre)
            .put('/genre/:id', requiresAdmin, handleUpdateGenreById)
            .delete('/genre/:id', requiresAdmin, handleDeleteGenreById);

        // Review routes
        this.router
            .get('/reviews/:id', handleGetReviewById)
            .post('/reviews', handlePostReviews);

        // Migrations
        this.router
            .get('/migration', up)
            .delete('/migration', down);

        this.router.static(join(process.cwd(), 'src', 'frontend'));
        this.router.onError(appErrorHandler);
        this.router.catchAll(handle404);
    }

    async run() {
        await DbConnection.connect();
        const server = http.createServer(this.router.triggerListeners.bind(this.router));
        server.listen(PORT);
    }
}
