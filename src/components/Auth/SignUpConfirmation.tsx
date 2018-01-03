import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {SignPaper} from './SignPaper';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {User} from '../../entities/User/User';
import {CurrentUser} from '../../entities/User/CurrentUser';

interface SignUpConfirmationProps {
    router: AbstractRouter;
    user: CurrentUser;
}

export class SignUpConfirmation extends BaseComponent<SignUpConfirmationProps> {

    render() {
        return (
            <SignPaper signIn={false} router={this.props.router}>
                Confirmation email has been sent to {this.props.user.email}. Please, check it to continue using site.
            </SignPaper>
        );
    }

}
