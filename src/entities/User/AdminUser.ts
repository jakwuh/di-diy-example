import {Service} from 'typedi';
import {User} from './User';

@Service()
export class AdminUser extends User {
    urlRoot = '/api/users';

    invite() {
        return this.post({
            url: '/api/invite',
            data: this.toJSON()
        });
    }

    toJSON() {
        return {
            ...super.toJSON(),
            loginAttempts: this.loginAttempts
        };
    }
}
