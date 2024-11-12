import { HealthCheck } from "../controllers/healthCheck";
import { CreateUserController, DeleteUserController, FindUsersController, UpdateUserController } from "../controllers/users";
import { Endpoint } from "../package/routing/endpoint";
import { http_methods } from "../package/routing/methods";

export function LoadRoutes() {
    new Endpoint("/", http_methods.GET, HealthCheck, null);
    new Endpoint("/users", http_methods.POST, CreateUserController, null);
    new Endpoint("/users", http_methods.PUT, UpdateUserController, null);
    new Endpoint("/users", http_methods.GET, FindUsersController, null);
    new Endpoint("/users", http_methods.DELETE, DeleteUserController, null);
}
