import {Service, Inject} from 'typedi';
import {AbstractRequest} from '../libs/Request/AbstractRequest';
import {AbstractRouter} from '../libs/Router/AbstractRouter';
import {AbstractState} from './AbstractState';

@Service({id: ConfirmationState, factory: ConfirmationState.factory})
export class ConfirmationState {
    succeed: boolean = true;

    constructor(public request: AbstractRequest,
                @Inject(() => AbstractRouter) public router: AbstractRouter) {
    }

    static factory(request: AbstractRequest, router: AbstractRouter) {
        let state = new ConfirmationState(request, router);
        let event = (router as any).lastEvent;

        return request.fetch({
            url: '/api/confirm',
            params: {
                token: (event.query as any).token
            }
        }).then(() => state, () => state);
    }

}
