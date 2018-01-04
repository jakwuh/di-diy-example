import {SpecRequest} from '../../libs/Request/SpecRequest';
import {AbstractCollection} from './AbstractCollection';

let collection, request;

beforeEach(() => {
    request = new SpecRequest();
    collection = new AbstractCollection(request);
});

test('push, length', () => {
    expect(collection.length).toBe(0);
    collection.push(1, 2);
    expect(collection.length).toBe(2);
});

test('collection methods', () => {
   const testMethod = method => {
       const fn = () => {};
       collection.models[method] = (_fn) => expect(_fn).toBe(fn);
       collection[method](fn);
   };

   testMethod('map');
   testMethod('find');
   testMethod('filter');
});
