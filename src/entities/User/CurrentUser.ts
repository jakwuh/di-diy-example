import {Roles} from '../../enums';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from './User';
import {Service} from 'typedi';

@Service({id: CurrentUser, factory: CurrentUser.factory})
export class CurrentUser extends User {
    protected invalidated?: boolean;

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
        }).then(() => {
            this.invalidated = true;
        });
    }

    remove() {
        return super.delete().then(() => {
            this.invalidated = true;
        });
    }

    requestResetPassword() {
        return super.delete({
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

    toJSON(): any {
        return {
            avatarUrl: this.avatarUrl
        };
    }

    updateWithEvent(event) {
        if (this.invalidated) {
            return;
        }
        if (this.loggedIn) {
            return this;
        } else {
            return this.fetch().catch(() => this);
        }
    }

    static factory(request: AbstractRequest) {
        let user = new CurrentUser(request);

        return user.fetch().catch(() => user);
    }

}
