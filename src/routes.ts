import {ResetPasswordContainer, ResetPasswordContainerProps} from './components/Auth/ResetPasswordContainer';
import {ConfirmationContainer, ConfirmationContainerProps} from './components/Auth/ConfirmationContainer';
import {ForgotContainer, ForgotContainerProps} from './components/Auth/ForgotContainer';
import {SignUpContainer, SignUpContainerProps} from './components/Auth/SignUpContainer';
import {SignInContainer, SignInContainerProps} from './components/Auth/SignInContainer';
import {HomeContainer, HomeContainerProps} from './components/Home/HomeContainer';
import {RouterEvent} from 'quantum-router/src/declarations';
import {CurrentUser} from './entities/User/CurrentUser';

export enum Routes {
    home,
    signIn,
    signUp,
    forgot,
    resetPassword,
    confirm
}

export const routesConfig = {
    '/': Routes.home,
    '/login/': Routes.signIn,
    '/signup/': Routes.signUp,
    '/forgot/': Routes.forgot,
    '/reset-password/': Routes.resetPassword,
    '/confirm/': Routes.confirm
};

export const containerConfig = {
    [Routes.home]: {
        Component: HomeContainer,
        ComponentProps: HomeContainerProps,
        check: (user: CurrentUser) => user.loggedIn,
        fallback: Routes.signIn
    },
    [Routes.signIn]: {
        Component: SignInContainer,
        ComponentProps: SignInContainerProps,
        check: (user: CurrentUser) => !user.loggedIn,
        fallback: Routes.home
    },
    [Routes.signUp]: {
        Component: SignUpContainer,
        ComponentProps: SignUpContainerProps,
        check: (user: CurrentUser) => !user.loggedIn,
        fallback: Routes.home
    },
    [Routes.forgot]: {
        Component: ForgotContainer,
        ComponentProps: ForgotContainerProps,
        check: (user: CurrentUser) => !user.loggedIn,
        fallback: Routes.home
    },
    [Routes.resetPassword]: {
        Component: ResetPasswordContainer,
        ComponentProps: ResetPasswordContainerProps,
        check: (user: CurrentUser, event: RouterEvent) => !user.loggedIn && (event.query as any).token,
        fallback: Routes.signIn
    },
    [Routes.confirm]: {
        Component: ConfirmationContainer,
        ComponentProps: ConfirmationContainerProps,
        check: (user: CurrentUser) => !user.loggedIn,
        fallback: Routes.home
    }
};
