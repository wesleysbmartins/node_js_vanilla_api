import http, { IncomingMessage, ServerResponse } from "http";
import { Router } from "./package/routing/router";
import { LoadRoutes } from "./routes/index";
import { securityMiddleware } from "./package/routing/security";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => securityMiddleware(req, res, new Router().handle));

LoadRoutes();

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("Server running in port: ", port);
});

export default server;
