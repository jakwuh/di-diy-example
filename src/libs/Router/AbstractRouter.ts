import {Router} from 'quantum-router/src/router';
import {Routes, routesConfig} from '../../routes';
import {ContainerInstance} from 'typedi';

export class AbstractRouter extends Router {

    constructor() {
        super({routes: routesConfig});

        (this as any).attachMiddleware();
    }

    navigateTo(route: Routes, params?: Object) {
        return this.navigate(this.reverseFrom(route, params));
    }

    reverseFrom(route: Routes, params?: Object): string {
        return super.reverse(route as any, params) as string;
    }

}
