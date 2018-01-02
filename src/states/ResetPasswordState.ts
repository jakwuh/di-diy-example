import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser} from '../entities/User/CurrentUser';
import {ValidationErrors} from 'validatorjs';
import {observable} from 'mobx';
import {AbstractRouter} from '../libs/Router/AbstractRouter';
import {Routes} from '../routes';

export class ResetPasswordState extends AbstractState {
    @Inject()
    currentUser: CurrentUser;

    @Inject(() => AbstractRouter)
    router: AbstractRouter;

    @observable
    errors?: ValidationErrors;

    @observable
    showConfirmation: boolean = false;

    async resetPassword() {
        try {
            let event = (this.router as any).lastEvent as any;

            this.errors = undefined;
            await this.currentUser.resetPassword(event.query.token);

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
