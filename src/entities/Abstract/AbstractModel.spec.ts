import {SpecRequest} from '../../libs/Request/SpecRequest';
import {AbstractModel} from './AbstractModel';

let model, request;

beforeEach(() => {
    request = new SpecRequest();
    model = new AbstractModel(request);
});

test('calculates url', () => {
    model.urlRoot = '/test';
    expect(model.url).toBe('/test/');
    model.id = 2;
    expect(model.url).toBe('/test/2/');
});

test('calculates isNew', () => {
    expect(model.isNew).toBe(true);
    model.id = 2;
    expect(model.isNew).toBe(false);
});

test('setAttributes', () => {
    expect(model.id).toBe(undefined);
    expect(model.name).toBe(undefined);
    model.setAttributes({id: 2, name: 'test'});
    expect(model.id).toBe(2);
    expect(model.name).toBe('test');
});

test('fetch', () => {
    request.fetch = () => Promise.resolve({data: {id: 2, name: 'test'}});

    return model.fetch().then(() => {
        expect(model.id).toBe(2);
        expect(model.name).toBe('test');
    });
});

test('save', () => {
    model.post = (data) => {
        expect(data).toEqual({data: {id: 1}});
        return Promise.resolve();
    };

    model.put = (data) => {
        expect(data).toEqual({data: {id: 2}});
        return Promise.resolve();
    };

    model.toJSON = () => ({id: 1});

    return model.save().then(() => {
        model.toJSON = () => ({id: 2});
        model.id = 2;
        model.save();
    });
});


