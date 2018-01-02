import {AbstractRequest} from './AbstractRequest';
import {Service} from 'typedi';
import axios from 'axios';

@Service({id: AbstractRequest, global: true})
export class ClientRequest {

    fetch(params) {
        return axios(params);
    }

}
