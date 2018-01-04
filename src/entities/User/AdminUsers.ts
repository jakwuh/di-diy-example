import {Service} from 'typedi';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from './User';
import {Users} from './Users';
import {AdminUser} from './AdminUser';
import {action} from 'mobx'

@Service({id: AdminUsers, factory: AdminUsers.factory})
export class AdminUsers extends Users<AdminUser> {
    urlRoot = '/api/users/';

    @action
    setModels(data: any[]) {
        this.models = data.map(userJson => {
            let user = new AdminUser(this.request);
            user.setAttributes(userJson);
            return user;
        });
    }

    fetch(params?) {
        return super.fetch(params).then(response => {
            this.setModels(response.data);
            return this;
        }, console.error);
    }

    static factory(request: AbstractRequest) {
        let users = new AdminUsers(request);

        return users.fetch();
    }

}
