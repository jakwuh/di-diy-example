import {Service} from 'typedi';
import {Zones} from './Zones';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {CurrentZone} from './CurrentZone';

@Service({id: CurrentZones, factory: CurrentZones.factory})
export class CurrentZones extends Zones<CurrentZone> {
    urlRoot = '/api/zones';

    static factory(request: AbstractRequest) {
        let zones = new CurrentZones(request);

        return zones.fetch().then(response => {
            zones.models = response.data.map(zoneJson => {
                let zone = new CurrentZone(request);
                zone.setAttributes(zoneJson);
                return zone;
            });
            return zones;
        });
    }
}
