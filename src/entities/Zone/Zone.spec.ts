import {SpecRequest} from '../../libs/Request/SpecRequest';
import {Zone} from './Zone';
import {User} from '../User/User';

let zone, request;

beforeEach(() => {
    request = new SpecRequest();
    zone = new Zone(request);
});

test('setAttributes', () => {
     zone.setAttributes({id: 1, user: {id: 2, email: 'test@mail.ru'}});
     expect(zone).toMatchObject({id: 1});
     expect(zone.user).toMatchObject({id: 2, email: 'test@mail.ru'});
     expect(zone.user).toBeInstanceOf(User);
});
