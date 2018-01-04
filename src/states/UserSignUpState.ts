import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser} from '../entities/User/CurrentUser';
import {ValidationErrors} from 'validatorjs';
import {observable} from 'mobx';

export class UserSignUpState extends AbstractState {
    @Inject()
    currentUser: CurrentUser;

    @observable
    errors?: ValidationErrors;

    @observable
    showConfirmation: boolean = false;

    async signUp() {
        try {
            this.errors = undefined;
            await this.currentUser.signUp();
            this.showConfirmation = true;
        } catch (error) {
            if (error && error.response) {
                let json = error.response.data;

                if (json && json.key === 'duplicateEmail') {
                    this.errors = {
                        email: 'Email exists'
                    };
                } else {
                    this.errors = {submit: 'Bad request'};
                }
            } else {
                this.errors = {submit: 'Something went wrong'};
                console.error(error);
            }
        }
    }

}
