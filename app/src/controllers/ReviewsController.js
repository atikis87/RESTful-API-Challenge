import Review from '../models/Review.js';
import {isString, stringRange} from '../validators/stringValidators.js';
import {NOOP} from '../constants.js';
import {isNumber} from '../validators/numberValidators.js';

export default class ReviewsController {
    static REVIEW_VALIDATORS = {
        score: [isNumber('Review score must be a number!')],
        title: [isString('Title must be a string!'), stringRange(3, 255, 'Title must be between 3 and 255 characters long!')],
        summary: [isString('Summary must be a string!'), stringRange(3, 4000, 'Summary must be between 3 and 4000 characters long')],
        book: [isNumber('Book ID must be a number!')],
        id: [NOOP]
    };

    createReview(reviewData) {
        this.validateBook(reviewData);
        const review = new Review(reviewData);
        return review.save();
    }

    validateBook(reviewData) {
        for(const key of Object.keys(reviewData)) {
            const validators = ReviewsController.REVIEW_VALIDATORS[key];
            if (!validators) {
                throw new Error(`Field "${key}" is not valid for new review!`);
            }
            for (const validator of validators) {
                validator(reviewData[key]);
            }
        }
    }

    async getReview(reviewId) {
        return Review.get(reviewId);
    }
}