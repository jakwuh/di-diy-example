import {AbstractRouter} from './AbstractRouter';
import {Service} from 'typedi';
import {createRenderDom} from './middleware/createRenderDom';
import {Container, ContainerInstance} from 'typedi';
import {hydrate, render} from 'react-dom';

@Service({id: AbstractRouter, global: true})
export class ClientRouter extends AbstractRouter {
    protected previousEvent: any;

    attachMiddleware() {
        let firstRender = this.createFirstRender();

        this.use(this.buildContainer.bind(this) as any);
        this.use(firstRender as any);
        this.use(createRenderDom({render, hydrate, router: this}));
        this.use(firstRender as any);
        this.use(this.redirectHandler.bind(this));
        this.use(null as any, this.errorHandler.bind(this));
        this.use(this.savePreviousEvent.bind(this));
    }

    buildContainer(event) {
        let lastContainer: ContainerInstance | undefined = this.previousEvent && this.previousEvent.container;
        let newContainer = Container.of(event);
        let newContainerGet = newContainer.get;

        newContainer.get = async function (identifier) {
            if (lastContainer) {
                let service = (lastContainer as any).findService(identifier);

                if (!service) {
                    const globalService = (Container.of(undefined) as any).findService(identifier);

                    if (globalService) {
                        if (globalService.global === true) {
                            service = globalService;
                        }
                    }
                }

                if (service && service.value) {
                    let value = await service.value;

                    if (value.updateWithEvent) {
                        let newInstance = await value.updateWithEvent(event);

                        if (newInstance) {
                            newContainer.set(identifier, newInstance);
                            lastContainer.remove(identifier);
                        }
                    }
                }
            }

            return newContainerGet.call(this, identifier);
        };

        event.container = Container.of(event);
    }

    savePreviousEvent(event) {
        this.previousEvent = event;
    }

    errorHandler(error) {
        console.error(error);
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
