import {computed, observable} from 'mobx';
import {AbstractModel} from '../Abstract/AbstractModel';
import {Service} from 'typedi';
import {Roles} from '../../enums';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';

export class User extends AbstractModel {
    @observable id?: string;
    @observable email?: string;
    @observable password?: string;
    role: Roles;

    @computed get loggedIn() {
        return this.id;
    }

    hasRole(role: Roles) {
        return this.role && this.role >= role;
    }

    get url() {
        return `/api/users/${this.id}/`;
    }
}
