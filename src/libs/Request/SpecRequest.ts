import {AbstractRequest} from './AbstractRequest';

export class SpecRequest extends AbstractRequest {

    fetch(params) {
        this.params = params;

        return Promise.resolve({data: {}});
    }

}
