import UserController from '../controllers/UserController.js';
import {StatusCodes} from 'http-status-codes';

const userController = new UserController();

export async function handleGetUsers(request, response) {
    const users = await userController.getAllUsers();
    response.sendResponse(StatusCodes.OK, users);
}

export async function handleGetUserById(request, response) {
    const userId = request.params.id;
    const user = await userController.getUser(userId);
    if (user) response.sendResponse(StatusCodes.OK, user);
    else response.sendResponse(StatusCodes.NOT_FOUND, `User with id ${userId} not found!`);
}

export async function handleDeleteUserById(request, response) {
    const userId = request.params.id;
    await userController.deleteUser(userId);
    response.sendResponse(StatusCodes.OK, 'User deleted!');
}

export async function handleUpdateUserById(request, response) {
    const userId = request.params.id;
    const body = await request.getJsonBody();
    await userController.updateUser(userId, body);
    response.sendResponse(StatusCodes.OK, 'User updated!');
}

export async function handlePostUsers(request, response) {
    const body = await request.getJsonBody();
    await userController.createUser(body);
    response.sendResponse(StatusCodes.CREATED, 'User created');
}