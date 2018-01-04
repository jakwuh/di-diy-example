import {SpecRequest} from '../../libs/Request/SpecRequest';
import {AdminZones} from './AdminZones';
import {AdminZone} from './AdminZone';

let zones, request;

beforeEach(() => {
    request = new SpecRequest();
    zones = new AdminZones(request);
});
test('fetch', () => {
    request.fetch = () => Promise.resolve({data: [{id: 1}, {id: 2}]});

    return zones.fetch().then(() => {
        expect(zones.length).toBe(2);
        expect(zones.models[0].id).toBe(1);
        expect(zones.models[1].id).toBe(2);
        zones.models.forEach(model => {
            expect(model).toBeInstanceOf(AdminZone);
        });
    });
});
