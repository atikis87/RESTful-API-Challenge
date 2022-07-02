import { resolve } from 'node:path';
import Request from './Request.js';
import Response from './Response.js';

export default class Router {
    constructor() {
        this.listeners = {
            get: {},
            post: {},
            delete: {},
            put: {}
        };
        this.staticMapping = {
            '/': 'index.html'
        };
    }

    isStatic(path) {
        return !!this.staticMapping[path];
    }

    async triggerListeners(req, res) {
        const request = new Request(req);
        const response = new Response(res);

        if(this.isStatic(request.getRoute())) {
            const filePath = resolve(this.staticFilesPath, this.staticMapping[request.getRoute()]);
            response.sendHtml(filePath);
            return;
        }

        try {
            const method = request.getMethod();
            const routeName = request.getRouteName();
            const listeners = this.listeners[method][routeName];
            if (listeners && listeners.length) {
                for (const listener of listeners) {
                    await listener(request, response);
                }
            } else this.handle404(request, response);
        } catch(e) {
            this.errorHandler(request, response, e);
        }
    }

    get(route, ...callbacks) {
        this.listeners.get[route] = callbacks;
        return this;
    }

    post(route, ...callback) {
        this.listeners.post[route] = callback;
        return this;
    }

    delete(route, ...callback) {
        this.listeners.delete[route] = callback;
        return this;
    }

    put(route, ...callback) {
        this.listeners.put[route] = callback;
        return this;
    }

    onError(errorHandler) {
        this.errorHandler = errorHandler;
    }

    catchAll(handle404) {
        this.handle404 = handle404;
    }

    static(staticFilesPath) {
        this.staticFilesPath = staticFilesPath;
    }
}
