import {Service} from 'typedi';
import {Zones} from './Zones';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {CurrentZone} from './CurrentZone';
import {action} from 'mobx';

@Service({id: CurrentZones, factory: CurrentZones.factory})
export class CurrentZones extends Zones<CurrentZone> {
    urlRoot = '/api/zones';

    @action
    setModels(data) {
        this.models = data.map(zoneJson => {
            let zone = new CurrentZone(this.request);
            zone.setAttributes(zoneJson);
            return zone;
        });
    }

    fetch(params?) {
        return super.fetch(params).then(response => {
            this.setModels(response.data);
            return this;
        });
    }

    static factory(request: AbstractRequest) {
        let zones = new CurrentZones(request);

        return zones.fetch();
    }
}
