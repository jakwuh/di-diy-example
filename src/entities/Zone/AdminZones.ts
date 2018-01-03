import {Service} from 'typedi';
import {Zones} from './Zones';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from '../User/User';
import {AdminZone} from './AdminZone';

@Service({id: AdminZones, factory: AdminZones.factory})
export class AdminZones extends Zones {
    urlRoot = '/api/admin/zones/';

    static factory(request: AbstractRequest) {
        let zones = new AdminZones(request);

        return zones.fetch().then(response => {
            zones.models = response.data.map(zoneJson => {
                let zone = new AdminZone(request);
                zone.setAttributes(zoneJson);
                return zone;
            });
            return zones;
        });
    }
}
