import {computed, observable} from 'mobx';
import {AbstractModel} from '../Abstract/AbstractModel';
import {Service} from 'typedi';
import {Roles} from '../../enums';

@Service()
export class User extends AbstractModel {
    @observable id?: string;
    @observable email?: string;
    @observable password?: string;
    @observable loginAttempts?: number = 0;
    @observable role: Roles = Roles.User;

    urlRoot = '/api/users';

    @computed get loggedIn() {
        return this.id;
    }

    @computed get isNew() {
        return !this.id;
    }

    hasRole(role: Roles) {
        return this.role && this.role >= role;
    }

    saveAdmin() {
        let data = this.toAdminJSON();

        return this.isNew ? this.post({data}) : this.put({data});
    }

    invite() {
        return this.post({
            url: '/api/invite',
            data: this.toAdminJSON()
        });
    }

    toAdminJSON() {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
            loginAttempts: this.loginAttempts
        };
    }
}
