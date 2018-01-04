import {SpecRequest} from '../../libs/Request/SpecRequest';
import {User} from './User';
import {Roles} from '../../enums';

let user, request;

beforeEach(() => {
    request = new SpecRequest();
    user = new User(request);
});

test('loggedIn', () => {
    expect(user.loggedIn).toBe(false);
    user.id = 2;
    expect(user.loggedIn).toBe(true);
});

test('hasRole', () => {
    const testRoles = (a, b, c) => {
        expect(user.hasRole(Roles.User)).toBe(a);
        expect(user.hasRole(Roles.Manager)).toBe(b);
        expect(user.hasRole(Roles.Admin)).toBe(c);
    };

    user.role = Roles.User;
    testRoles(true, false, false);
    user.role = Roles.Manager;
    testRoles(true, true, false);
    user.role = Roles.Admin;
    testRoles(true, true, true);
});
