import 'libs/Request/ClientRequest';
import 'libs/Router/ClientRouter';
import {Container} from 'typedi';
import {AbstractRouter} from '../Router/AbstractRouter';

export class ClientApplication {
    protected router: AbstractRouter;

    async start() {
        this.router = await Container.get(AbstractRouter);

        await this.router.start();
    }

}
