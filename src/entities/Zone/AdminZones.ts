import {Service} from 'typedi';
import {Zones} from './Zones';
import {AbstractRequest} from '../../libs/Request/AbstractRequest';
import {User} from '../User/User';
import {AdminZone} from './AdminZone';
import {action} from 'mobx';

@Service({id: AdminZones, factory: AdminZones.factory})
export class AdminZones extends Zones {
    urlRoot = '/api/admin/zones';

    @action
    setModels(data) {
        this.models = data.map(zoneJson => {
            let zone = new AdminZone(this.request);
            zone.setAttributes(zoneJson);
            return zone;
        });
        return this;
    }

    fetch() {
        return super.fetch().then(response => {
           this.setModels(response.data);
            return this;
        });
    }

    static factory(request: AbstractRequest) {
        let zones = new AdminZones(request);

        return zones.fetch();
    }
}
