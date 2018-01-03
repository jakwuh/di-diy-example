import {Service} from 'typedi';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {AbstractCollection} from '../Abstract/AbstractCollection';
import {User} from './User';

@Service({id: Users, factory: Users.factory})
export class Users extends AbstractCollection<User> {
    urlRoot = '/api/users/';

    static factory(request: AbstractRequest) {
        let users = new Users(request);

        return users.fetch().then(response => {
            users.models = response.data.map(userJson => {
                let user = new User(request);
                user.setAttributes(userJson);
                return user;
            });
            return users;
        });
    }

}
