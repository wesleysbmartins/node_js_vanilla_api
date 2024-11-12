import { IncomingMessage, ServerResponse } from "http";
import { Endpoint } from "./endpoint";

export class Router {
    static endpoints: Map<string, Endpoint> = new Map();

    async handle(req: IncomingMessage, res: ServerResponse) {
        try {
            const path = req.url!.split("?")[0];
            const endpoint = Router.endpoints.get(`${path}:${req.method}`);

            if (!endpoint) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Endpoint not found" }));
            }

            await endpoint.handle(req, res);
        } catch (err) {
            console.error("Error handling request:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Internal server error" }));
        }
    }
}
