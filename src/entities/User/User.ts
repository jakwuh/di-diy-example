import {computed, observable} from 'mobx';
import {AbstractModel} from '../Abstract/AbstractModel';
import {Service} from 'typedi';
import {Roles} from '../../enums';

@Service()
export class User extends AbstractModel {
    @observable email?: string;
    @observable password?: string;
    @observable loginAttempts?: number = 0;
    @observable role: Roles = Roles.User;
    @observable avatarUrl?: string | null;

    urlRoot = '/api/users';

    @computed get loggedIn() {
        return Boolean(this.id);
    }

    hasRole(role: Roles) {
        return this.role && this.role >= role;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
        };
    }
}
