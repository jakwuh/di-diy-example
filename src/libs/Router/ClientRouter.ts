import {AbstractRouter} from './AbstractRouter';
import {Service} from 'typedi';
import {createRenderDom} from './middleware/createRenderDom';
import {Container} from 'typedi';
import {hydrate, render} from 'react-dom';

@Service({id: AbstractRouter, global: true})
export class ClientRouter extends AbstractRouter {

    attachMiddleware() {
        let firstRender = this.createFirstRender();

        this.use(this.saveLastEvent.bind(this));
        this.use(this.buildContainer as any);
        this.use(firstRender as any);
        this.use(createRenderDom({render, hydrate, router: this}));
        this.use(firstRender as any);
        this.use(this.redirectHandler.bind(this));
    }

    buildContainer(event) {
        event.container = Container.of(event);
    }

    saveLastEvent(event) {
        this.lastEvent = event;
    }

    createFirstRender() {
        let isFirstRender = true;
        return (event) => {
            event.isFirstRender = isFirstRender;
            isFirstRender = false;
        }
    }

    redirectHandler(event) {
        if (event.redirectTo) {
            this.navigate(event.redirectTo);
        }
    }

}
