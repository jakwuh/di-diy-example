import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {UserSignInState} from '../../states/UserSignInState';
import {validateLoginParams} from '../../helpers/validation';
import {ValidationErrors} from 'validatorjs';
import {SignForm} from './SignForm';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

export class SignInContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: UserSignInState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class SignInContainer extends BaseComponent<SignInContainerProps> {
    @observable
    protected errors?: ValidationErrors;

    @action.bound
    onSubmit() {
        this.errors = validateLoginParams(this.props.currentUser);

        if (!this.errors) {
            return this.props.routeState.login();
        }
    }

    render() {
        let errors = this.errors ? this.errors : this.props.routeState.errors;

        return (
            <SignForm
                router={this.props.router}
                user={this.props.currentUser}
                onSubmit={this.onSubmit}
                errors={errors}
                signIn
            />
        );
    }
}
