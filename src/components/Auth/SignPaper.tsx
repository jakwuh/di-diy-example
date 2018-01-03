import * as React from 'react';
import {Paper} from 'components/ui.tsx';
import {Routes} from '../../routes';
import {BaseComponent} from '../Common/BaseComponent';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

interface SignPaperProps {
    signIn: boolean;
    router: AbstractRouter;
}

export class SignPaper extends BaseComponent<SignPaperProps> {
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
                        <a href={this.props.router.reverseFrom(Routes.forgot)} style={bottomLinkStyle}> Forgot password?</a> : null}
                    {this.props.signIn
                        ? <a href={this.props.router.reverseFrom(Routes.signUp)} style={bottomLinkStyle}>Sign up</a>
                        : <a href={this.props.router.reverseFrom(Routes.signIn)} style={bottomLinkStyle}>Sign in</a>
                    }
                </p>
            </div>
        );
    }
}
