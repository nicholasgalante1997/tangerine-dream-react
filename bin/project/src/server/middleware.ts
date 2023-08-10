import { Request, Response, NextFunction } from 'express';

interface EchoOptions {
    disabled?: boolean;
};

export function inspectReq({ disabled = false }: EchoOptions) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!disabled) {
            logRequest(req);
        }
        next();
    }
}

function logRequest(req: Request) {
    const { headers, body, method, originalUrl, query, path } = req;
    const template = 
    `***************************************
      body: ${body}
      method: ${method}
      query: ${query}
      path: ${path}
      originalUrl: ${originalUrl},
      headers: ${Object.entries(headers).map(([k,v]) => `${k}=${Array.isArray(v) ? v.join(', ') : v}`).join(';')}
    ****************************************`
    console.log(template);
}