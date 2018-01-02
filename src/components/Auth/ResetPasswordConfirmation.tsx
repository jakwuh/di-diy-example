import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {SignPaper} from './SignPaper';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

interface ResetPasswordConfirmationProps {
    router: AbstractRouter;
}

export class ResetPasswordConfirmation extends BaseComponent<ResetPasswordConfirmationProps> {

    render() {
        return (
            <SignPaper signIn={false} router={this.props.router}>
                Success! You can now sign in with your new password.
            </SignPaper>
        );
    }

}
