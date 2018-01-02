import {AbstractRequest} from './AbstractRequest';
import {Service, Token, Inject} from 'typedi';
import axios from 'axios';

export const RequestHeaders = new Token<Dict>();
export const RequestBaseURL = new Token<String>();

@Service(AbstractRequest)
export class ServerRequest {
    @Inject(RequestHeaders)
    headers: Dict;

    @Inject(RequestBaseURL)
    baseURL: string;


    fetch(params) {
        params.headers = this.headers;
        params.baseURL = this.baseURL;

        return axios(params);
    }
}
