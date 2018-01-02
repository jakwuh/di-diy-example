import {AbstractState} from './AbstractState';
import {Inject} from 'typedi';
import {CurrentUser} from '../entities/User/CurrentUser';
import {AbstractRouter} from '../libs/Router/AbstractRouter';
import {observable} from 'mobx';
import {ValidationErrors} from 'validatorjs';
import {Routes} from '../routes';

export class UserSignInState extends AbstractState {
    @Inject()
    currentUser: CurrentUser;

    @Inject(() => AbstractRouter)
    router: AbstractRouter;

    @observable
    errors?: ValidationErrors;

    async login() {
        try {
            this.errors = undefined;
            await this.currentUser.login();
            this.router.navigateTo(Routes.home);
        } catch (error) {
            if (error && error.response) {
                let {errors} = error.response.data;

                if (errors && Object.keys(errors).length) {
                    this.errors = errors;
                } else {
                    this.errors = {submit: 'Invalid credentials'};
                }
            } else {
                this.errors = {submit: 'Something went wrong'};
                console.error(error);
            }
        }
    }
}
