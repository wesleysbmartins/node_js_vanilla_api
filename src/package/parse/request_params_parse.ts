import { IncomingMessage } from "http";
import url from "url";

export async function parseBody(req: IncomingMessage) {
    let data = "";

    await new Promise((resolve: Function, reject: Function) => {
        req.on("data", chunk  => {
            data += chunk.toString();
        });

        req.on('end', resolve());
        req.on('error', reject());
    });

    if (data === "") return null;

    if (req.headers['content-type'] === 'application/json') {
        try {
            return JSON.parse(data);
        } catch (err) {
            throw new Error("Invalid JSON format");
        }

    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        return new URLSearchParams(data);
    }

    return data;
}

export async function parseQueryParams(req: IncomingMessage) {
    const parsedUrl = url.parse(req.url!, true);

    return parsedUrl.query;
}
