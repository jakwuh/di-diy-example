import {Roles} from '../../enums';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from './User';
import {Service} from 'typedi';

@Service({id: CurrentUser, factory: CurrentUser.factory})
export class CurrentUser extends User {

    get url() {
        return `/api/user/`;
    }

    login() {
        return this.post({
            url: '/api/login',
            data: {
                email: this.email,
                password: this.password
            }
        });
    }

    signUp() {
        return this.post({
            url: '/api/signup',
            data: {
                email: this.email,
                password: this.password
            }
        });
    }

    logout() {
        return this.fetch({
            url: '/api/logout'
        });
    }

    requestResetPassword() {
        return this.delete({
            url: '/api/user/password',
            data: {
                email: this.email
            }
        });
    }

    resetPassword(token) {
        return this.put({
            url: '/api/user/password',
            data: {
                token,
                password: this.password
            }
        });
    }

    toJSON() {
        return {
            avatarUrl: this.avatarUrl
        };
    }

    static factory(request: AbstractRequest) {
        let user = new CurrentUser(request);

        return user.fetch().catch(error => {
            if (!IS_SERVER) {
                console.error(error);
            }
            return user;
        });
    }

}
