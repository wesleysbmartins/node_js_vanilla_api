import { IncomingMessage, ServerResponse } from "http";

export function securityMiddleware(req: IncomingMessage, res: ServerResponse, requestHandler: Function) : boolean {

    const allowedOrigins : string[] = [];
    const origin = req.headers.origin;

    if (allowedOrigins.length && origin && allowedOrigins.includes(origin))
        res.setHeader("Access-Control-Allow-Origin", origin);
    else res.setHeader("Access-Control-Allow-Origin", "*");

    
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Verifica se a solicitação é uma preflight request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return true; // Indica que a resposta já foi tratada
    }

    // Remover cabeçalho X-Powered-By
    res.removeHeader('X-Powered-By');

    // Cabeçalhos de segurança
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; script-src 'self';");

    return requestHandler(req, res);  
}
