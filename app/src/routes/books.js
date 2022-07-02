import {StatusCodes} from 'http-status-codes';
import BooksController from '../controllers/BooksController.js';

const booksController = new BooksController();

export async function handleGetBooks(request, response) {
    const books = await booksController.getAllBooks();
    response.sendResponse(StatusCodes.OK, books);
}

export async function handleGetBookById(request, response) {
    const bookId = request.params.id;
    const book = await booksController.getBook(bookId);
    if (book) response.sendResponse(StatusCodes.OK, book);
    else response.sendResponse(StatusCodes.OK, `Book with id ${bookId} not found!`);
}

export async function handleDeleteBookById(request, response) {
    const bookId = request.params.id;
    await booksController.deleteBook(bookId);
    response.sendResponse(StatusCodes.OK, 'Book deleted!');
}

export async function handleUpdateBookById(request, response) {
    const bookId = request.params.id;
    const body = await request.getJsonBody();
    await booksController.updateBook(bookId, body);
    response.sendResponse(StatusCodes.OK, 'Book updated!');
}

export async function handlePostBooks(request, response) {
    const body = await request.getJsonBody();
    await booksController.createBook(body);
    response.sendResponse(StatusCodes.CREATED, 'Book created');
}