import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {SignPaper} from './SignPaper';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {User} from '../../entities/User/User';

interface ForgotConfirmationProps {
    router: AbstractRouter;
    user: User;
}

export class ForgotConfirmation extends BaseComponent<ForgotConfirmationProps> {

    render() {
        return (
            <SignPaper signIn={false} router={this.props.router}>
                Email with reset password link has been sent to {this.props.user.email}.
            </SignPaper>
        );
    }

}
