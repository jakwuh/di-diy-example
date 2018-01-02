import {computed, observable} from 'mobx';
import {Service} from 'typedi';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {Inject} from 'typedi';

@Service()
export class AbstractModel {
    @Inject()
    request: AbstractRequest;

    @observable lastPromise: Promise<any> | null = null;
    ref?: Object;

    @computed get isLoading() {
        return Boolean(this.lastPromise);
    }

    get url() {
        return '/';
    }

    setAttributes(attrs) {
        this.ref = attrs;
        Object.assign(this, attrs);
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
            if (response.data) {
                this.setAttributes(response.data);
            }

            return this;
        }, error => {
            this.lastPromise = null;
            throw error;
        });

        return this.lastPromise;
    }

    post(params) {
        return this.fetch({
            ...params,
            method: 'post'
        });
    }

    delete(params) {
        return this.fetch({
            ...params,
            method: 'delete'
        });
    }

    put(params) {
        return this.fetch({
            ...params,
            method: 'put'
        });
    }

    serialize() {
        return this.ref;
    }

    static restore<T extends AbstractModel>(data): T {
        let instance = new this;

        instance.setAttributes(data);

        return instance as T;
    }
}
