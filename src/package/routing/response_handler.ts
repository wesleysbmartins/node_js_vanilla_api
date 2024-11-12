import { ServerResponse } from "http";

export enum StatusRequestSuccess {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    PartialContent = 206,
};

export enum StatusRequestError {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    UnprocessableEntity = 422,
    TooManyRequests = 429,
    InternalServerError = 500,
    NotImplemented = 501,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
}

export async function SendSuccess(status: StatusRequestSuccess, data: any, res: ServerResponse) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: status, type: Object.keys(status)[0], data: data }));
}

export async function SendError(status: StatusRequestError, message: any, res: ServerResponse) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: status, type: Object.keys(status)[0], error: message }));
}
