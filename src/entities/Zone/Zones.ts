import {Service} from 'typedi';
import {AbstractCollection} from '../Abstract/AbstractCollection';
import {Zone} from './Zone';
import {AbstractModel} from '../Abstract/AbstractModel';

@Service()
export class Zones<T extends AbstractModel = Zone> extends AbstractCollection<T> {

}
