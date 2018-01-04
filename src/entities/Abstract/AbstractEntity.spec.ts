import {AbstractEntity} from './AbstractEntity';
import {SpecRequest} from '../../libs/Request/SpecRequest';

let entity, request;

beforeEach(() => {
    request = new SpecRequest();
    entity = new AbstractEntity(request);
});

test('calculates isLoading', () => {
    expect(entity.isLoading).toBe(false);
    entity.lastPromise = Promise.resolve();
    expect(entity.isLoading).toBe(true);
    entity.lastPromise = null;
    expect(entity.isLoading).toBe(false);
});

test('has rest methods', () => {
    let params;

    entity.fetch = p => params = p;

    let opts = {a: {c: 1}, b: {d: 1}};

    Object.freeze(opts);

    ['post', 'put', 'delete'].forEach(method => {
        entity[method](opts);
        expect(params).toEqual({...opts, method});
    });
});

test('proxies request .fetch', () => {
    let opts = {a: {c: 1}, b: {d: 1}};

    Object.freeze(opts);

    request.fetch = params => {
        expect(params).toEqual({...opts, method: 'post', url: entity.url});
        return Promise.resolve();
    };

    entity.post(opts);
});
