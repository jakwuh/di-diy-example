import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser, User} from '../entities/User/User';

export class UserProfileState extends AbstractState {
    @Inject()
    public currentUser: User;


}
