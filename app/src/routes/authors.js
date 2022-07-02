import {StatusCodes} from 'http-status-codes';
import AuthorController from '../controllers/AuthorController.js';

const authorController = new AuthorController();

export async function handleGetAuthors(request, response) {
    const authors = await authorController.getAllAuthors();
    response.sendResponse(StatusCodes.OK, authors);
}

export async function handleGetAuthorById(request, response) {
    const authorId = request.params.id;
    const author = await authorController.getAuthor(authorId);
    if (author) response.sendResponse(StatusCodes.OK, author);
    else response.sendResponse(StatusCodes.OK, `Author with id ${authorId} not found!`);
}

export async function handleDeleteAuthorById(request, response) {
    const authorId = request.params.id;
    await authorController.deleteAuthor(authorId);
    response.sendResponse(StatusCodes.OK, 'Author deleted!');
}

export async function handleUpdateAuthorById(request, response) {
    const authorId = request.params.id;
    const body = await request.getJsonBody();
    await authorController.updateAuthor(authorId, body);
    response.sendResponse(StatusCodes.OK, 'Author updated!');
}

export async function handlePostAuthors(request, response) {
    const body = await request.getJsonBody();
    await authorController.createAuthor(body);
    response.sendResponse(StatusCodes.OK, 'Author created!');
}