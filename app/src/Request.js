import url from 'url';

const ROUTES_PATTERNS = {
    '/users/:id': /^\/users\/(?<id>[0-9]+)\/?$/,
    '/books/:id': /^\/books\/(?<id>[\d]+)\/?$/,
    '/authors/:id': /^\/authors\/(?<id>[\d]+)\/?$/,
    '/genre/:id': /^\/genre\/(?<id>[\d]+)\/?$/,
    '/reviews/:id': /^\/reviews\/(?<id>[\d]+)\/?$/,
};

export default class Request {
    constructor(req) {
        this.name = null;
        this.req = req;
        this.url = url.parse(this.req.url);
        this.params = this.parseParams();
    }

    getRouteName() {
        return this.name || this.getRoute();
    }

    parseParams() {
        for (const patternName of Object.keys(ROUTES_PATTERNS)) {
            const result = this.getRoute().match(ROUTES_PATTERNS[patternName]);
            if (result?.groups) {
                this.name = patternName;
                return {...result.groups};
            }
        }
        return {};
    }

    getRoute() {
        return this.url.pathname;
    }

    getMethod() {
        return this.req.method.toLowerCase();
    }

    getHeader(headerName) {
        return this.req.headers[headerName];
    }

    async getJsonBody() {
        const buffers = [];
        for await (const chunk of this.req) {
            buffers.push(chunk);
        }
        return JSON.parse(Buffer.concat(buffers).toString());
    }
}
