import Author from '../models/Author.js';
import {isString, stringRange} from '../validators/stringValidators.js';
import {NOOP} from '../constants.js';
import Controller from './Controller.js';

export default class AuthorController {
    static AUTHOR_VALIDATORS = {
        name: [isString('Name is not a string!'), stringRange(3, 50, 'Author name must be at least 3 characters long!')],
        id: [NOOP]
    };

    getAuthor(id) {
        return Author.get(id);
    }

    getAllAuthors() {
        return Author.getAllAuthors();
    }

    createAuthor(authorData) {
        this.validateAuthor(authorData);
        const author = new Author(authorData);
        return author.save();
    }

    async updateAuthor(id, authorData) {
        Controller.checkForProtectedFields(authorData);
        const author = await Author.get(id);
        if (!author) throw new Error(`Author with id: ${id} does not exist!`);
        const updatedAuthor = { ...author, ...authorData };
        this.validateAuthor(updatedAuthor);
        return Author.update(id, authorData);
    }

    async deleteAuthor(id) {
        if(! await Author.delete(id)) throw new Error('Author does not exist!');
    }

    validateAuthor(authorData) {
        for(const key of Object.keys(authorData)) {
            const validators = AuthorController.AUTHOR_VALIDATORS[key];
            if (!validators) {
                throw new Error(`Field '${key}' is not valid for new author!`);
            }
            for (const validator of validators) {
                validator(authorData[key]);
            }
        }
    }
}