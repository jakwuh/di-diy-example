import {validateEmail, validateLoginParams, validateResetPasswordParams} from './validation';

test('validateLoginParams', () => {
    expect(validateLoginParams({
        email: 'e22',
        password: '2222'
    })).toHaveProperty('email');

    expect(validateLoginParams({
        email: 'e22@fmf.ri',
        password: '2222'
    })).toBeUndefined();
});

test('validateEmail', () => {
    expect(validateEmail({
        email: 'e22'
    })).toHaveProperty('email');

    expect(validateEmail({
        email: 'e22@fmf.ri'
    })).toBeUndefined();
});

test('validateResetPasswordParams', () => {
    expect(validateResetPasswordParams({
        password: 'e22'
    })).toHaveProperty('password');

    expect(validateResetPasswordParams({
        password: 'e22@fmf.ri'
    })).toBeUndefined();
});
