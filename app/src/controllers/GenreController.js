import Genre from '../models/Genre.js';
import {isString, stringRange} from '../validators/stringValidators.js';
import {NOOP} from '../constants.js';
import Controller from './Controller.js';

export default class GenreController {
    static GENRE_VALIDATORS = {
        name: [isString('Genre name is not a string!'), stringRange(5, 50, 'Genre name must be at least 5 characters long!')],
        id: [NOOP]
    };

    getAllGenre() {
        return Genre.getAllGenre();
    }

    getGenre(id) {
        return Genre.get(id);
    }

    async createGenre(genreData) {
        this.validateGenre(genreData);
        const genre = new Genre(genreData);
        return genre.save();
    }

    async updateGenre(id, genreData) {
        Controller.checkForProtectedFields(genreData);
        const genre = await Genre.get(id);
        if (!genre) throw new Error('Genre not found!');
        const updatedGenre = { ...genre, ...genreData };
        this.validateGenre(updatedGenre);
        return Genre.update(id, genreData);
    }

    async deleteGenre(id) {
        if(! await Genre.delete(id)) throw new Error('Genre does not exist!');
    }

    validateGenre(genreData) {
        for(const key of Object.keys(genreData)) {
            const validators = GenreController.GENRE_VALIDATORS[key];
            if (!validators) {
                throw new Error(`Field '${key}' is not valid for new genre!`);
            }
            for (const validator of validators) {
                validator(genreData[key]);
            }
        }
    }
}