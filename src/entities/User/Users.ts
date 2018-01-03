import {Service} from 'typedi';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {AbstractCollection} from '../Abstract/AbstractCollection';

@Service({id: Users, factory: Users.factory})
export class Users extends AbstractCollection {
    urlRoot = '/api/users/';

    static factory(request: AbstractRequest) {
        let users = new Users(request);

        return users.fetch().then(() => users);
    }

}
