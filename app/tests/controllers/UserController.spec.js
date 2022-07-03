import UserController from '../../src/controllers/UserController.js';

describe('controllers/UserController', () => {
    describe('validateUser()', () => {
        it('throws if userData contains unknown field', () => {
            const userController = new UserController();
            expect(() => userController.validateUser({
                unknownField: 'Hello!'
            })).toThrow('Field "unknownField" is not valid for new user!');
        });
        it('throws if email is not a valid email', () => {
            const userController = new UserController();
            expect(() => userController.validateUser({
                email: 123
            })).toThrow('Email is not valid!');
        });
        it('throws if password is too short', () => {
            const userController = new UserController();
            expect(() => userController.validateUser({
                password: 'ab'
            })).toThrow('Password must be between 3 and 50 characters long!');
        });
        it('does not throw if user data is valid', () => {
            const userData = {
                username: 'Test Name!',
                password: 'testPassword',
                passwordConfirm: 'testPassword',
                role: 'reviewer',
                avatar: 'http://someurl.com',
                email: 'email@somemail.com'
            };
            const userController = new UserController();
            expect(() => userController.validateUser(userData)).not.toThrow();
        });
    });
});