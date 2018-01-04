import 'libs/Router/ServerRouter';
import {Container} from 'typedi';
import {Express, Request, Response} from 'express';
import * as express from 'express';
import {ServerRouter, ServerRouterEvent} from '../Router/ServerRouter';
import {RequestBaseURL, RequestHeaders} from '../Request/ServerRequest';
import * as proxy from 'express-http-proxy';
import {parse as parseUrl} from 'url';
import {stringify} from 'querystring'
import {AbstractRouter} from '../Router/AbstractRouter';

export class ServerApplication {
    protected port: string | number;
    protected app: Express;

    constructor() {
        this.port = process.env.PORT || 3001;
        this.app = express();

        this.app.use('/assets', express.static(ASSETS_ROOT, {
            fallthrough: true
        }), () => {});

        this.app.use(/\/(api|auth)/, proxy('http://localhost:3000', {
            proxyReqPathResolver: function(req) {
                return parseUrl(req.originalUrl).path;
            }
        }));


        this.use(this.slashRedirect);
        this.use(this.render.bind(this));
    }

    use(middleware) {
        if (middleware[Symbol.toStringTag] === 'AsyncFunction') {
            this.app.use((req, res, next) => {
                Promise.resolve(middleware(req, res, next)).catch(next);
            })
        } else {
            this.app.use(middleware);
        }
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening at http://localhost:${this.port}`);
        });
    }

    slashRedirect(req: Request, res, next) {
        if (!req.path.endsWith('/')) {
            res.redirect(req.path + '/' + (req.query ? '?' + stringify(req.query) : ''));
        } else {
            next();
        }
    }

    async render(req: Request, res: Response, next) {
        let container = Container.of(req);

        container.set(RequestHeaders, req.headers);
        container.set(RequestBaseURL, `http://localhost:${this.port}`);

        let router = await container.get(AbstractRouter) as ServerRouter;
        router.setContainer(container);

        try {
            let event = await router.match(req.url) as ServerRouterEvent;

            if (event.redirectTo) {
                res.redirect(event.redirectTo);
            } else {
                res.type('html');
                res.end(event.body);
            }

            container.reset();
        } catch (error) {
            console.error(req.url, req.originalUrl, req.body, req.params);
            console.error(error);
            next();
        }

    }

}

(global as any).navigator = {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'};
