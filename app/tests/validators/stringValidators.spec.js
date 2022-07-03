import {isString, stringRange} from '../../src/validators/stringValidators.js';

describe('validators/stringValidators', () => {
    describe('isString()', () => {
        it('throws if not string', () => {
            const error = 'One is not a string!';
            const stringValidator = isString(error);
            expect(() => stringValidator(1)).toThrow(error);
        });
    });

    describe('stringRange()', () => {
        it('throws if string is not between min max length', () => {
            const error = 'Not between 1 and 5';
            const isInRange = stringRange(1, 5, error);
            expect(() => isInRange('Very looong string!')).toThrow(error);
        });
        it('does not throw if in between min max length', () => {
            const error = 'Not between 1 and 5';
            const isInRange = stringRange(1, 5, error);
            expect(() => isInRange('Hi!')).not.toThrow(error);
        });
    });
});