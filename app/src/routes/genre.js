import {StatusCodes} from 'http-status-codes';
import GenreController from '../controllers/GenreController.js';

const genreController = new GenreController();

export async function handleGetGenres(request, response) {
    const genre = await genreController.getAllGenre();
    response.sendResponse(StatusCodes.OK, genre);
}

export async function handleGetGenreById(request, response) {
    const genreId = request.params.id;
    const genre = await genreController.getGenre(genreId);
    if (genre) response.sendResponse(StatusCodes.OK, genre);
    else response.sendResponse(StatusCodes.OK, `Genre with id ${genreId} not found!`);
}

export async function handleDeleteGenreById(request, response) {
    const genreId = request.params.id;
    await genreController.deleteGenre(genreId);
    response.sendResponse(StatusCodes.OK, 'Genre deleted!');
}

export async function handleUpdateGenreById(request, response) {
    const genreId = request.params.id;
    const body = await request.getJsonBody();
    await genreController.updateGenre(genreId, body);
    response.sendResponse(StatusCodes.OK, 'Genre updated!');
}

export async function handlePostGenre(request, response) {
    const body = await request.getJsonBody();
    await genreController.createGenre(body);
    response.sendResponse(StatusCodes.CREATED, 'Genre created!');
}