import {Service} from 'typedi';
import {Zones} from './Zones';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {CurrentZone} from './CurrentZone';

@Service({id: CurrentZones, factory: CurrentZones.factory})
export class CurrentZones extends Zones<CurrentZone> {
    urlRoot = '/api/zones';

    fetch(params?) {
        return super.fetch(params).then(response => {
            this.models = response.data.map(zoneJson => {
                let zone = new CurrentZone(this.request);
                zone.setAttributes(zoneJson);
                return zone;
            });
            return this;
        });
    }

    static factory(request: AbstractRequest) {
        let zones = new CurrentZones(request);

        return zones.fetch();
    }
}
