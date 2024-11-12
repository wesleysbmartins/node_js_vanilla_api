import { IncomingMessage, ServerResponse } from "http";
import { User } from "../entities/user";
import { parseBody, parseQueryParams } from "../package/parse/request_params_parse";
import { SendError, SendSuccess } from "../package/routing/response_handler";
import { CreateUserUseCase, DeleteUserUseCase, FindUsersUseCase, UpdateUserUseCase } from "../usecases/users";

export async function CreateUserController(req: IncomingMessage, res: ServerResponse) {
    const body = await parseBody(req);

    if (!body.name) return SendError(400, "Param name is required!", res);
    if (!body.username) return SendError(400, "Param username is required!", res);
    if (!body.password) return SendError(400, "Param password is required!", res);
    
    const response = CreateUserUseCase(new User(body.name, body.username, body.password));

    if (typeof response !== "string") return SendError(response.status, response.messageError, res);

    return SendSuccess(201, response, res);
}

export async function UpdateUserController(req: IncomingMessage, res: ServerResponse) {
    const body = await parseBody(req);

    if (!body.id) return SendError(400, "Param id is required!", res);
    if (!body.name) return SendError(400, "Param name is required!", res);
    if (!body.username) return SendError(400, "Param username is required!", res);
    if (!body.password) return SendError(400, "Param password is required!", res);
    
    const userToUpdate = new User(body.name, body.username, body.password);
    userToUpdate.id = body.id;

    const response = UpdateUserUseCase(userToUpdate);

    if (typeof response !== "string") return SendError(response.status, response.messageError, res);

    return SendSuccess(200, response, res);
}

export async function FindUsersController(req: IncomingMessage, res: ServerResponse) {
    const queryParams = await parseQueryParams(req);

    const response = FindUsersUseCase(queryParams)

    if (response.Exception) return SendError(response.Exception.status, response.Exception.messageError, res);

    return SendSuccess(200, response.Data, res);
}

export async function DeleteUserController(req: IncomingMessage, res: ServerResponse) {
    const queryParams = await parseQueryParams(req);

    if (!queryParams.id) return SendError(400, "Param id is required!", res);

    const response = DeleteUserUseCase(queryParams.id as string);

    if (typeof response !== "string") return SendError(response.status, response.messageError, res);

    return SendSuccess(200, "User deleted with success!", res);
}
