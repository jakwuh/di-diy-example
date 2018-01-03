import {computed, observable} from 'mobx';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {Service} from 'typedi';

@Service()
export class AbstractEntity {
    constructor(public request: AbstractRequest) {
    }

    @observable lastPromise: Promise<any> | null = null;

    @computed get isLoading() {
        return Boolean(this.lastPromise);
    }

    get url() {
        return '/';
    }
    fetch(params: Dict<any> = {}) {
        if (this.lastPromise) {
            return this.lastPromise.then(
                () => this.fetch(params),
                () => this.fetch(params)
            );
        }

        params.url = params.url || this.url;

        this.lastPromise = this.request.fetch(params).then(response => {
            this.lastPromise = null;
            return response;
        }, error => {
            this.lastPromise = null;
            throw error;
        });

        return this.lastPromise;
    }

    post(params = {}) {
        return this.fetch({
            ...params,
            method: 'post'
        });
    }

    delete(params = {}) {
        return this.fetch({
            ...params,
            method: 'delete'
        });
    }

    put(params = {}) {
        return this.fetch({
            ...params,
            method: 'put'
        });
    }
}
