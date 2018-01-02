import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {SignPaper} from './SignPaper';
import {ConfirmationState} from '../../states/ConfirmationState';

export class ConfirmationContainerProps {
    @Inject(() => AbstractRouter)
    router: AbstractRouter;

    @Inject(() => ConfirmationState)
    routeState: ConfirmationState;
}

export class ConfirmationContainer extends BaseComponent<ConfirmationContainerProps> {
    render() {
        let text = this.props.routeState.succeed
            ? 'Account has been successfully confirmed. You can now log in.'
            : 'Wrong confirmation link.';

        return (
            <SignPaper signIn={false} router={this.props.router}>
                {text}
            </SignPaper>
        );

    }
}
