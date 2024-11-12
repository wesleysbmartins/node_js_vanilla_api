import { IncomingMessage, ServerResponse } from "http";
import { SendSuccess } from "../package/routing/response_handler";

export async function HealthCheck(req: IncomingMessage, res: ServerResponse) {
    return SendSuccess(200, "I'am Vanilla JS Server!", res);
}
