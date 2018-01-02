import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {validateLoginParams} from '../../helpers/validation';
import {ValidationErrors} from 'validatorjs';
import {SignForm} from './SignForm';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {UserSignUpState} from '../../states/UserSignUpState';
import {SignUpConfirmation} from './SignUpConfirmation';

export class SignUpContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: UserSignUpState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class SignUpContainer extends BaseComponent<SignUpContainerProps> {
    @observable
    protected errors?: ValidationErrors;

    @action.bound
    onSubmit() {
        this.errors = validateLoginParams(this.props.currentUser);

        if (!this.errors) {
            return this.props.routeState.signUp();
        }
    }

    render() {
        let errors = this.errors ? this.errors : this.props.routeState.errors;
        let {showConfirmation} = this.props.routeState;

        return showConfirmation
            ? (
                <SignUpConfirmation
                    router={this.props.router}
                    user={this.props.currentUser}
                />
            ) : (
                <SignForm
                    router={this.props.router}
                    user={this.props.currentUser}
                    onSubmit={this.onSubmit}
                    errors={errors}
                    signIn={false}
                />
            );
    }
}
