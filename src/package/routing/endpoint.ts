import { IncomingMessage, ServerResponse } from "http";
import { http_methods } from "./methods";
import { Router } from "./router";

export class Endpoint {
    path: string;
    method: string;
    controller: Function;
    midleware: Function | null;

    constructor(path: string, method: http_methods, controller: Function, midleware: Function | null) {

        this.path = path;
        this.method = method;
        this.controller = controller;
        this.midleware = midleware;

        const routeKey = `${this.path}:${this.method}`;

        if (Router.endpoints.has(routeKey)) throw new Error(`Endpoint ${routeKey} already exists!`);

        Router.endpoints.set(routeKey, this);
    }

    async handle(req: IncomingMessage, res: ServerResponse) {
        if (this.midleware) await this.midleware(req, res);
        return this.controller(req, res);
    }
}