import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser, User} from '../entities/User/User';

export class TimezonesState extends AbstractState {
    @Inject()
    public currentUser: User;
}
