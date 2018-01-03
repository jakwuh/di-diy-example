import {AbstractRouter} from './AbstractRouter';
import {RouterEvent} from 'quantum-router/src/declarations';
import {createRenderDom} from './middleware/createRenderDom';
import {Service, ContainerInstance} from 'typedi';
import {renderToString} from 'react-dom/server';
import {useStaticRendering} from 'mobx-react';

useStaticRendering(true);

export type ServerRouterEvent = RouterEvent & {body: string, redirectTo: string}

@Service(AbstractRouter)
export class ServerRouter extends AbstractRouter {
    protected container: ContainerInstance;

    attachMiddleware() {
        this.use(this.buildContainer.bind(this) as any);
        this.use(createRenderDom({render: renderToString, router: this}));
    }

    buildContainer(event) {
        event.container = this.container;
    }

    setContainer(container: ContainerInstance) {
        this.container = container;
    }

}
