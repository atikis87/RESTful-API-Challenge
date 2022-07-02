import Book from '../models/Book.js';
import {isString, stringRange} from '../validators/stringValidators.js';
import {NOOP} from '../constants.js';
import AuthorController from './AuthorController.js';
import GenreController from './GenreController.js';
import Controller from './Controller.js';

export default class BooksController {
    static BOOK_VALIDATORS = {
        name: [isString('Name is not a string!'), stringRange(3, 50, 'Name must be between 3 and 50 characters long!')],
        description: [isString('Description must be a string!'), stringRange(3, 4000, 'Description must be between 3 and 4000 characters long!')],
        cover: [isString('Cover must be a string!'), stringRange(3, 50, 'Cover must be between 3 and 50 characters long')],
        author: AuthorController.AUTHOR_VALIDATORS.name,
        genre: GenreController.GENRE_VALIDATORS.name,
        id: [NOOP]
    };

    async getAllBooks() {
        return Book.getAllBooks();
    }

    createBook(bookData) {
        this.validateBook(bookData);
        const book = new Book(bookData);
        return book.save();
    }

    async deleteBook(id) {
        if(! await Book.delete(id)) throw new Error('Book does not exist!');
    }

    getBook(id) {
        return Book.get(id);
    }

    async updateBook(id, bookData) {
        Controller.checkForProtectedFields(bookData);
        const book = await Book.get(id);
        if (!book) throw new Error('Book not found!');
        const updatedBook = { ...book, ...bookData };
        this.validateBook(updatedBook);
        return Book.update(id, bookData);
    }

    validateBook(bookData) {
        for(const key of Object.keys(bookData)) {
            const validators = BooksController.BOOK_VALIDATORS[key];
            if (!validators) {
                throw new Error(`Field "${key}" is not valid for new book!`);
            }
            for (const validator of validators) {
                validator(bookData[key]);
            }
        }
    }
}