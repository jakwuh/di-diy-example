import {Service} from 'typedi';
import {AbstractCollection} from '../Abstract/AbstractCollection';
import {User} from './User';
import {AbstractModel} from '../Abstract/AbstractModel';

@Service()
export class Users<T extends AbstractModel = User> extends AbstractCollection<T> {
    urlRoot = '/api/users/';
}
