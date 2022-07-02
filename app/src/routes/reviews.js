import {StatusCodes} from 'http-status-codes';
import ReviewsController from '../controllers/ReviewsController.js';

const reviewsController = new ReviewsController();

export async function handlePostReviews(request, response) {
    const body = await request.getJsonBody();
    await reviewsController.createReview(body);
    response.sendResponse(StatusCodes.CREATED, 'Review created');
}

export async function handleGetReviewById(request, response) {
    const reviewId = request.params.id;
    const review = await reviewsController.getReview(reviewId);
    if (review) response.sendResponse(StatusCodes.OK, review);
    else response.sendResponse(StatusCodes.NOT_FOUND, `Review with id ${reviewId} not found!`);
}