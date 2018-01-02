import * as React from 'react';
import {TextField, RaisedButton} from 'components/ui';
import {BaseComponent} from '../Common/BaseComponent';
import {FormEvent} from 'react';
import {action, observable} from 'mobx';
import {User} from '../../entities/User/User';
import {observer} from 'mobx-react';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {SignPaper} from 'components/Auth/SignPaper';

interface SignFormProps {
    signIn: boolean;
    errors?: Dict;
    user: User;
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
                        errorText={errors && errors.email}
                        floatingLabelText="Email"
                        value={email || ''}
                        onChange={this.onChangeEmail}
                    /><br/>

                    <TextField
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
                        primary={true}
                        onClick={this.onSubmit}
                        style={{
                            float: 'right'
                        }}
                    />

                    {errors && errors.submit ? <span style={{
                        lineHeight: '36px',
                        fontSize: '14px',
                        float: 'left'
                    }}>{errors.submit}</span> : null}
                </form>
            </SignPaper>
        )
    }
}
