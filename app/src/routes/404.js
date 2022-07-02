import {StatusCodes} from 'http-status-codes';

export function handle404(req, res) {
    res.sendResponse(StatusCodes.NOT_FOUND, 'What are you looking for?');
}