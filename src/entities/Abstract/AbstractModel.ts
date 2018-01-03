import {AbstractEntity} from './AbstractEntity';
import {Service} from 'typedi';
import {computed, observable} from 'mobx';

@Service()
export class AbstractModel extends AbstractEntity {
    @observable id?: string;
    ref?: Object;
    urlRoot = '';

    get url() {
        return this.urlRoot + (this.id ? '/' + this.id + '/' : '/');
    }

    @computed get isNew() {
        return !this.id;
    }

    setAttributes(attrs) {
        this.ref = attrs;
        Object.assign(this, attrs);
    }

    fetch(params: Dict<any> = {}) {
        return super.fetch(params).then(response => {
            if (response.data) {
                this.setAttributes(response.data);
            }

            return this;
        });
    }

    save() {
        let data = (this as any).toJSON();

        return this.isNew ? this.post({data}) : this.put({data});
    }
}
