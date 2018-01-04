import './ServerRequest';
import {Container} from 'typedi';
import {RequestBaseURL, RequestHeaders, ServerRequest} from './ServerRequest';
import {AbstractRequest} from './AbstractRequest';

test('injects headers / baseUrl', async () => {
    let container = Container.of({});
    container.set(RequestHeaders, {a: 'b'});
    container.set(RequestBaseURL, '/customBaseUrl');

    let request = await container.get(AbstractRequest as any) as ServerRequest;

    expect(request.headers).toEqual({a: 'b'});
    expect(request.baseURL).toEqual('/customBaseUrl');
});
