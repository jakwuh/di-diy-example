import {SpecRequest} from '../../libs/Request/SpecRequest';
import {CurrentUser} from './CurrentUser';

let user, request;

beforeEach(() => {
    request = new SpecRequest();
    user = new CurrentUser(request);
});

test('invalidated', () => {
    const testMethod = method => user[method]().then(() => {
        expect(user.invalidated).toBe(true);
        return user.updateWithEvent({});
    }).then(result => {
        expect(result).toBeUndefined();
    });

    testMethod('logout');
    testMethod('remove');
});
