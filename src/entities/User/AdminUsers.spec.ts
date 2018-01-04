import {SpecRequest} from '../../libs/Request/SpecRequest';
import {AdminUsers} from './AdminUsers';
import {AdminUser} from './AdminUser';

let users, request;

beforeEach(() => {
    request = new SpecRequest();
    users = new AdminUsers(request);
});

test('fetch', () => {
    request.fetch = () => Promise.resolve({data: [{id: 1}, {id: 2}]});

    return users.fetch().then(() => {
        expect(users.length).toBe(2);
        expect(users.models[0].id).toBe(1);
        expect(users.models[1].id).toBe(2);
        users.models.forEach(model => {
            expect(model).toBeInstanceOf(AdminUser);
        });
    });
});
