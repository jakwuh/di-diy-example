import * as Validator from 'validatorjs';

const createValidator = rules => data => {
    let validation = new Validator(data, rules);

    if (validation.fails()) {
        return validation.errors.all();
    }
};

export const validateLoginParams = createValidator({
    email: 'required|email',
    password: 'required|min:4'
});

export const validateEmail = createValidator({
    email: 'required|email'
});

export const validateResetPasswordParams = createValidator({
    password: 'required|min:4'
});

export const validateForgotParams = validateEmail;
