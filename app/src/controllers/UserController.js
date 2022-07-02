import User from '../models/User.js';
import {isEmail, isString, isUrl, stringRange} from '../validators/stringValidators.js';
import {NOOP} from '../constants.js';
import Controller from './Controller.js';

export default class UserController {
    static USER_VALIDATORS = {
        username: [isString('Username is not a string!'), stringRange(3, 50, 'Username must be between 3 and 50 characters long!')],
        password: [isString('Password must be a string!'), stringRange(3, 50, 'Password must be between 3 and 50 characters long!')],
        avatar: [isString('Avatar must be a string!'), isUrl('Avatar must be a valid URL!')],
        role: [NOOP],
        email: [isEmail('Email is not valid!')],
        passwordConfirm: [NOOP],
        id: [NOOP]
    };

    async getAllUsers() {
        return User.getAllUsers();
    }

    createUser(userData) {
        this.validateUser(userData);
        this.validateCreateUserPassword(userData);
        const user = new User({ ...userData, role: 'reviewer' });
        return user.save();
    }

    async deleteUser(id) {
        if(! await User.delete(id)) throw new Error('User does not exist!');
    }

    getUser(id) {
        return User.get(id);
    }

    async updateUser(id, userData) {
        Controller.checkForProtectedFields(userData);
        const user = await User.get(id);
        if(!user) throw new Error(`User with id: '${id}' does not exist!`);
        const updatedUser = { ...user, ...userData };
        this.validateUser(updatedUser);
        return User.update(id, userData);
    }

    validateUser(userData) {
        for(const key of Object.keys(userData)) {
            const validators = UserController.USER_VALIDATORS[key];
            if (!validators) {
                throw new Error(`Field "${key}" is not valid for new user!`);
            }
            for (const validator of validators) {
                validator(userData[key]);
            }
        }
    }

    validateCreateUserPassword(userData) {
        if(userData.password !== userData.passwordConfirm) {
            throw new Error('Passwords do not match!');
        }
    }
}
