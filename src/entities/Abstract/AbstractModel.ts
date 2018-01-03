import {AbstractEntity} from './AbstractEntity';
import {Service} from 'typedi';

@Service()
export class AbstractModel extends AbstractEntity {
    id?: string;
    ref?: Object;
    urlRoot = '';

    get url() {
        return this.urlRoot + (this.id ? '/' + this.id + '/' : '/');
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
}
