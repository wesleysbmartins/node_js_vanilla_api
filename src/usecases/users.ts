import { ParsedUrlQuery } from "querystring";
import { User } from "../entities/user";
import { UseCaseResponse } from "./usecases_response";

const users : User[] = [
    {
        id: 1,
        name: "Wesley Martins",
        username: "wmartins",
        password: "1234"
    }
];

export function CreateUserUseCase(user: User) {
    const userExists = users.find((u) => u.username === user.username);

    if (userExists) return usersExceptions.UsernameException;

    users.push({
        ...user,
        id: users.length + 1,
    });

    return "User created with Success!";
}

export function UpdateUserUseCase(user: User) {
    const index = users.findIndex((u) => u.id == user.id);

    if (index === -1) return usersExceptions.UserNotFoundException;

    users[index] = user;

    return "User updated with Success!";
}

export function FindUsersUseCase(queryParams: any) : UseCaseResponse {
    let response : UseCaseResponse = {
        Data: null,
        Exception: null
    };

    if (!Object.keys(queryParams).length) {
        response.Data = users;
        return response;
    }

    const possibleUsers: User[] = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.id == queryParams.id) {
            response.Data = user;
            return response;
        } else if(user.username === queryParams.username) {
            response.Data = user;
            return response;
        }
        else if (user.name === queryParams.name) possibleUsers.push(user);
    }



    if (possibleUsers.length === 0) response.Exception = usersExceptions.NoUsersException;
    else response.Data = possibleUsers;

    return response;
}

export function DeleteUserUseCase(id: string) {
    
    if (!id) return usersExceptions.UserIDException;

    const index = users.findIndex((user) => user.id!.toString() === id);

    if (index === -1) return usersExceptions.UserNotFoundException;

    users.splice(index, 1);

    return "User deleted with success!";
}

const usersExceptions = {
    UsernameException: {
        status: 409,
        messageError: "Username alreadly in use!",
    },
    NoUsersException: {
        status: 404,
        messageError: "No users found!",
    },
    UserIDException : {
        status: 422,
        messageError: "Param id is required!",
    },
    UserNotFoundException: {
        status: 409,
        messageError: "User not found!",

    },
};
