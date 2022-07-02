import Router from '../src/Router.js';
import Request from '../src/Request.js';
import Response from '../src/Response.js';

const jest = import.meta.jest;

describe('app/Router', () => {
    describe('get()', () => {
        it('registers a route and triggers a get handler', async() => {
            // arrange
            const router = new Router();
            const getHandler1 = jest.fn();
            const getHandler2 = jest.fn();
            const req = { url: 'http://localhost:8080/users', method: 'GET' };
            const res = {};
            router.get('/users', getHandler1, getHandler2);

            // act
            await router.triggerListeners(req, res);

            // assert
            expect(getHandler1).toHaveBeenCalledTimes(1);
            expect(getHandler1).toHaveBeenCalledWith(new Request(req), new Response(res));
            expect(getHandler2).toHaveBeenCalledTimes(1);
            expect(getHandler2).toHaveBeenCalledWith(new Request(req), new Response(res));
        });

        it('throws and stops calling rest of route handlers if error happens', async() => {
            // arrange
            const router = new Router();
            const getHandler1 = jest.fn().mockRejectedValue('Not an admin!');
            const getHandler2 = jest.fn();
            const errorHandler = jest.fn();
            const req = { url: 'http://localhost:8080/users', method: 'GET' };
            const res = {};
            router.onError(errorHandler);
            router.get('/users', getHandler1, getHandler2);

            // act
            await router.triggerListeners(req, res);

            // assert
            expect(getHandler1).toHaveBeenCalledTimes(1);
            expect(getHandler1).toHaveBeenCalledWith(new Request(req), new Response(res));
            expect(getHandler2).not.toHaveBeenCalled();
        });
    });
});
