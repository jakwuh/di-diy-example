import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {validateResetPasswordParams} from '../../helpers/validation';
import {ValidationErrors} from 'validatorjs';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {ResetPasswordForm} from './ResetPasswordForm';
import {ResetPasswordState} from '../../states/ResetPasswordState';
import {ResetPasswordConfirmation} from './ResetPasswordConfirmation';

export class ResetPasswordContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: ResetPasswordState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class ResetPasswordContainer extends BaseComponent<ResetPasswordContainerProps> {
    @observable
    protected errors?: ValidationErrors;

    @action.bound
    onSubmit() {
        this.errors = validateResetPasswordParams(this.props.currentUser);

        if (!this.errors) {
            return this.props.routeState.resetPassword();
        }
    }

    render() {
        let errors = this.errors ? this.errors : this.props.routeState.errors;
        let {showConfirmation} = this.props.routeState;

        return showConfirmation
            ? (
                <ResetPasswordConfirmation
                    router={this.props.router}
                />
            ) : (
                <ResetPasswordForm
                    router={this.props.router}
                    user={this.props.currentUser}
                    onSubmit={this.onSubmit}
                    errors={errors}
                />
            );
    }
}
