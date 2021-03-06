import {AbstractEntity} from './AbstractEntity';
import {computed, observable} from 'mobx';
import {Service} from 'typedi';
import {AbstractModel} from './AbstractModel';

@Service()
export class AbstractCollection<T extends AbstractModel = AbstractModel> extends AbstractEntity {
    urlRoot = '';

    @observable models: T[] = [];

    @computed get length() {
        return this.models.length;
    }

    get url() {
        return this.urlRoot;
    }

    remove(model: AbstractModel) {
        return model.delete().then(() => {
            this.models = this.models.filter(_model => _model.id !== model.id);
        });
    }

    map(fn): any[] {
        return this.models.map(fn);
    }

    find(fn): T | undefined {
        return this.models.find(fn);
    }

    filter(fn): T[] {
        return this.models.filter(fn);
    }

    push(...values) {
        return this.models.push(...values);
    }

}
