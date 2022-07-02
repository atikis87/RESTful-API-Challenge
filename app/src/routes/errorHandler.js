import {StatusCodes} from 'http-status-codes';

export function appErrorHandler(req, res, error) {
    // Figure out how to improve this for better errors
    res.sendResponse(StatusCodes.BAD_REQUEST, error.message);
}
