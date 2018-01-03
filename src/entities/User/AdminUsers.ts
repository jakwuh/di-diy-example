import {Service} from 'typedi';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from './User';
import {Users} from './Users';
import {AdminUser} from './AdminUser';

@Service({id: AdminUsers, factory: AdminUsers.factory})
export class AdminUsers extends Users<AdminUser> {
    urlRoot = '/api/users/';

    static factory(request: AbstractRequest) {
        let users = new AdminUsers(request);

        return users.fetch().then(response => {
            users.models = response.data.map(userJson => {
                let user = new AdminUser(request);
                user.setAttributes(userJson);
                return user;
            });
            return users;
        }, console.error);
    }

}
