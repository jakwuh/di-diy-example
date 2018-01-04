import {SpecRequest} from '../../libs/Request/SpecRequest';
import {AdminUser} from './AdminUser';

let user, request;

beforeEach(() => {
    request = new SpecRequest();
    user = new AdminUser(request);
});

test('toJSON', () => {
    user.id = 2;
    user.loginAttempts = 1;
    expect(user.toJSON()).toMatchObject({loginAttempts: 1, id: 2});
});
