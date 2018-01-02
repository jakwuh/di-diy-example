import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {validateForgotParams} from '../../helpers/validation';
import {ValidationErrors} from 'validatorjs';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {UserForgotState} from '../../states/UserForgotState';
import {ForgotConfirmation} from './ForgotConfirmation';
import {ForgotForm} from './ForgotForm';

export class ForgotContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: UserForgotState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class ForgotContainer extends BaseComponent<ForgotContainerProps> {
    @observable
    protected errors?: ValidationErrors;

    @action.bound
    onSubmit() {
        this.errors = validateForgotParams(this.props.currentUser);

        if (!this.errors) {
            return this.props.routeState.requestResetPassword();
        }
    }

    render() {
        let errors = this.errors ? this.errors : this.props.routeState.errors;
        let {showConfirmation} = this.props.routeState;

        return showConfirmation
            ? (
                <ForgotConfirmation
                    router={this.props.router}
                    user={this.props.currentUser}
                />
            ) : (
                <ForgotForm
                    router={this.props.router}
                    user={this.props.currentUser}
                    onSubmit={this.onSubmit}
                    errors={errors}
                />
            );
    }
}
