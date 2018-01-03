import {computed, observable} from 'mobx';
import {AbstractModel} from '../Abstract/AbstractModel';
import {Service} from 'typedi';
import {User} from '../User/User';

@Service()
export class Zone extends AbstractModel {
    @observable name?: string;
    @observable city?: string;
    @observable offset: number = 0;
    @observable user: User;

    setAttributes(attrs) {
        super.setAttributes(attrs);
        this.user = new User(this.request);
        this.user.setAttributes(attrs.user);
    }
}
