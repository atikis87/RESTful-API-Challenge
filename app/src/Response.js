import * as fs from 'fs';

export default class Response {
    constructor(res) {
        this.res = res;
    }

    sendResponse(code, body) {
        this.res.setHeader('Content-Type', 'application/json');
        this.res.writeHead(code);
        this.res.end(JSON.stringify(body));
    }

    sendHtml(filePath) {
        this.res.writeHead(200, { 'content-type': 'text/html' });
        fs.createReadStream(filePath).pipe(this.res);
    }
}