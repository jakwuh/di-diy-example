import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser} from '../entities/User/CurrentUser';
import {ValidationErrors} from 'validatorjs';
import {observable} from 'mobx';

export class UserForgotState extends AbstractState {
    @Inject()
    currentUser: CurrentUser;

    @observable
    errors?: ValidationErrors;

    @observable
    showConfirmation: boolean = false;

    async requestResetPassword() {
        try {
            this.errors = undefined;
            await this.currentUser.requestResetPassword();
            this.showConfirmation = true;
        } catch (error) {
            if (error && error.response) {
                this.errors = {submit: 'Bad request'};
            } else {
                this.errors = {submit: 'Something went wrong'};
                console.error(error);
            }
        }
    }

}
