import {Zone} from './Zone';
import {Service} from 'typedi';

@Service()
export class AdminZone extends Zone {
    urlRoot = '/api/admin/zones';

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            city: this.city,
            offset: this.offset,
            userId: this.user && this.user.id
        };
    }
}
