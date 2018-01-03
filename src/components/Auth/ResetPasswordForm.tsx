import * as React from 'react';
import {TextField, RaisedButton} from 'components/ui.tsx';
import {BaseComponent} from '../Common/BaseComponent';
import {FormEvent} from 'react';
import {action, observable} from 'mobx';
import {User} from '../../entities/User/User';
import {observer} from 'mobx-react';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {SignPaper} from 'components/Auth/SignPaper';

interface ResetPasswordFormProps {
    errors?: Dict;
    user: User;
    onSubmit: any;
    router: AbstractRouter;
}

@observer
export class ResetPasswordForm extends BaseComponent<ResetPasswordFormProps> {
    @observable showErrors: boolean = false;

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
        let {errors, router, user: {isLoading, password}} = this.props;

        errors = this.showErrors ? errors : undefined;

        return (
            <SignPaper signIn={false} router={router}>
                <form onSubmit={this.onSubmit}>
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
                        label={'Reset password'}
                        onClick={this.onSubmit}
                        style={{
                            float: 'right'
                        }}
                        primary
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
