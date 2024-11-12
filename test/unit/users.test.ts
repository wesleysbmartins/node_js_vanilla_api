import { User } from "../../src/entities/user";
import { CreateUserUseCase, DeleteUserUseCase, FindUsersUseCase, UpdateUserUseCase } from "../../src/usecases/users";

describe("testes unitários de usecases de usuários", () => {
    const userToCreate : User = {
        name: "Kenai Martins",
        username: "kmartins",
        password: "12345678",
    };

    const userToUpdate : User = {
        id: 2,
        name: "Kenai Brandão",
        username: "martinsk",
        password: "87654321",
    };
    
    const userToFind = {
        id: 1,
        name: "Wesley Martins",
        username: "wmartins",
        password: "1234",
    };
    
    test("Criando usuário", () => {
        const response = CreateUserUseCase(userToCreate);
        expect(response).toBe("User created with Success!");
    });

    test("Atualizando usuário", () => {
        const response = UpdateUserUseCase(userToUpdate);
        expect(response).toBe("User updated with Success!");
    });
    
    
    test("Buscando usuário", () => {
        const response = FindUsersUseCase({ id: userToFind.id });
        const { Data } = response;
        expect(JSON.stringify(Data)).toBe(JSON.stringify(userToFind));
    });
    
    
    test("Deletando usuário", () => {
        const response = DeleteUserUseCase(userToFind.id.toString());
        expect(response).toBe("User deleted with success!");
    });    
});
