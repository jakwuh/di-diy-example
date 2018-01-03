import * as React from 'react';
import {Paper} from 'components/ui.tsx';
import {Routes} from '../../routes';
import {action} from 'mobx';
import {BaseComponent} from '../Common/BaseComponent';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

interface SignPaperProps {
    signIn: boolean;
    router: AbstractRouter;
}

export class SignPaper extends BaseComponent<SignPaperProps> {

    @action.bound
    onClickSignIn(event) {
        event.preventDefault();
        this.props.router.navigateTo(Routes.signIn)
    }

    @action.bound
    onClickSignUp(event) {
        event.preventDefault();
        this.props.router.navigateTo(Routes.signUp)
    }

    @action.bound
    onClickForgot(event) {
        event.preventDefault();
        this.props.router.navigateTo(Routes.forgot)
    }

    render() {
        let bottomLinkStyle = {
            padding: '10px',
            fontSize: '14px'
        };

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'column'
            }}>
                <Paper zDepth={2} style={{
                    display: 'inline-block',
                    padding: '20px',
                    maxWidth: '296px'
                }}>
                    {this.props.children}
                </Paper>
                <p>
                    {this.props.signIn ?
                        <a style={bottomLinkStyle} onClick={this.onClickForgot}> Forgot password?</a> : null}
                    {this.props.signIn
                        ? <a style={bottomLinkStyle} onClick={this.onClickSignUp}>Sign up</a>
                        : <a style={bottomLinkStyle} onClick={this.onClickSignIn}>Sign in</a>
                    }
                </p>
            </div>
        );
    }
}
