import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {User} from '../entities/User/User';

export class UserProfileState extends AbstractState {
    @Inject()
    public currentUser: User;

}
