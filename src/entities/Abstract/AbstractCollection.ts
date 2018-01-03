import {AbstractEntity} from './AbstractEntity';
import {observable} from 'mobx';
import {Service} from 'typedi';
import {AbstractModel} from './AbstractModel';

@Service()
export class AbstractCollection<T = any> extends AbstractEntity {
    urlRoot = '';

    @observable models: T[] = [];

    get url() {
        return this.urlRoot;
    }


    fetch(params: Dict<any> = {}) {
        return super.fetch(params).then(response => {
            if (response.data) {
                this.models = response.data;
            }

            return this;
        });
    }

    remove(model: AbstractModel) {
        return model.delete().then(() => {
            this.models = this.models.filter(_model => _model.id !== model.id);
        });
    }

    map(fn) {
        return this.models.map(fn);
    }

    find(fn) {
        return this.models.find(fn);
    }

    filter(fn) {
        return this.models.filter(fn);
    }

    push(...values) {
        return this.models.push(...values);
    }

}
