import {AxiosResponse} from 'axios';

export abstract class AbstractRequest {

    abstract fetch(params): Promise<AxiosResponse>

}
