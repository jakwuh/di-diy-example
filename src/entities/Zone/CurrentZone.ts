import {Zone} from './Zone';
import {Service} from 'typedi';

@Service()
export class CurrentZone extends Zone {
    urlRoot = '/api/zones';

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            city: this.city,
            offset: this.offset
        };
    }
}
