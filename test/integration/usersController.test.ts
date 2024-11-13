import { createServer } from "http";
import { UseCaseResponse } from "../../src/usecases/usecases_response";
import * as UsersUseCase from "../../src/usecases/users";
import request from "supertest";
import { Router } from "../../src/package/routing/router";
import { LoadRoutes } from "../../src/routes/index";

const url = "/users"

describe("Testes de integração de Users", () => {
    const testServer = createServer(new Router().handle);

    beforeAll((done) => {
        LoadRoutes();
        testServer.listen(4000, done);
    });

    afterAll((done) => {
        testServer.close(done);
    });

    const findUsersResponse : UseCaseResponse = {
        Data: {
                id: 1,
                name: "Wesley Martins",
                username: "wmartins",
                password: "1234"
            },
        Exception: null,
    };

    jest.spyOn(UsersUseCase, "CreateUserUseCase").mockReturnValue("User created with Success!");
    jest.spyOn(UsersUseCase, "UpdateUserUseCase").mockReturnValue("User updated with Success!");
    jest.spyOn(UsersUseCase, "FindUsersUseCase").mockReturnValue(findUsersResponse);
    jest.spyOn(UsersUseCase, "DeleteUserUseCase").mockReturnValue("User deleted with success!");

    test("Criando usuário", async () => {
        const response = await request(testServer).post(url).send({
            name: "Koda",
            username: "koda",
            password: "1234",
        });

        expect(response.body).toEqual({ status: 201, data: "User created with Success!" });
    });

    test("Atualizando usuário", async () => {
        const response = await request(testServer).put(url).send({
            id: 2,
            name: "Koda",
            username: "koda",
            password: "1234",
        });

        expect(response.body).toEqual({ status: 200, data: "User updated with Success!" });
    });

    test("Buscando usuário", async () => {
        const response = await request(testServer).get(url).query({ id: 1 });

        expect(response.body).toEqual({ status: 200, data: findUsersResponse.Data });
    });

    test("Deletando usuário", async () => {
        const response = await request(testServer).delete(url).query({ id: 2 });

        expect(response.body).toEqual({ status: 200, data: "User deleted with success!" });
    });

    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});
