import * as React from 'react';
import {TextField, RaisedButton, FacebookIcon, GitHubIcon} from 'components/ui.tsx';
import {BaseComponent} from '../Common/BaseComponent';
import {FormEvent} from 'react';
import {action, observable} from 'mobx';
import {User} from '../../entities/User/User';
import {observer} from 'mobx-react';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {SignPaper} from 'components/Auth/SignPaper';
import {CurrentUser} from '../../entities/User/CurrentUser';

interface SignFormProps {
    signIn: boolean;
    errors?: Dict;
    user: CurrentUser;
    onSubmit: any;
    router: AbstractRouter;
}

@observer
export class SignForm extends BaseComponent<SignFormProps> {
    @observable showErrors: boolean = false;

    @action.bound
    onChangeEmail(event: FormEvent<HTMLInputElement>) {
        this.showErrors = false;
        this.props.user.email = event.currentTarget.value;
    }

    @action.bound
    onChangePassword(event: FormEvent<HTMLInputElement>) {
        this.showErrors = false;
        this.props.user.password = event.currentTarget.value;
    }

    @action.bound
    onSubmit(event: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.showErrors = true;
        this.props.onSubmit();
    }

    render() {
        let {errors, signIn, router, user: {isLoading, email, password}} = this.props;

        errors = this.showErrors ? errors : undefined;

        return (
            <SignPaper signIn={signIn} router={router}>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        id="sign-email"
                        errorText={errors && errors.email}
                        floatingLabelText="Email"
                        value={email || ''}
                        onChange={this.onChangeEmail}
                    /><br/>

                    <TextField
                        id="sign-password"
                        type="password"
                        errorText={errors && errors.password}
                        floatingLabelText="Password"
                        value={password || ''}
                        onChange={this.onChangePassword}
                    /><br/><br/>

                    <RaisedButton
                        disabled={isLoading}
                        type="submit"
                        label={signIn ? 'Sign in' : 'Sign up'}
                        onClick={this.onSubmit}
                        style={{
                            float: 'right'
                        }}
                        primary
                    />

                    <a href="/auth/facebook" style={{marginRight: 10}}><FacebookIcon/></a>
                    <a href="/auth/github"><GitHubIcon/></a>

                    {errors && errors.submit ? <div style={{
                        lineHeight: '36px',
                        fontSize: '14px'
                    }}>{errors.submit}</div> : null}
                </form>
            </SignPaper>
        )
    }
}
