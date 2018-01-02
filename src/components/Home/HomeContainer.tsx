import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {Inject} from 'typedi';
import {TimezonesState} from '../../states/TimezonesState';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

export class HomeContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: TimezonesState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

export class HomeContainer extends BaseComponent<HomeContainerProps> {

    render() {
        return (
            "Welcome"
        );
    }
}
