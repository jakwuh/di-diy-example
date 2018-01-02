import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {BaseComponent} from '../Common/BaseComponent';
import {CurrentUser, User} from '../../entities/User/User';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {Routes} from '../../routes';
import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu} from 'components/ui';
import {observer} from 'mobx-react';
import {Roles} from '../../enums';
import {action} from 'mobx';

interface DocumentHeadProps {
    user: CurrentUser;
    router: AbstractRouter;
}

@observer
export class DocumentHead extends BaseComponent<DocumentHeadProps> {

    @action.bound
    signOut() {
        this.props.user.logout().then(() => {
            this.props.router.navigateTo(Routes.signIn);
        }, console.error);
    }

    getLoggedInEl() {
        let {user} = this.props;

        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                {user.hasRole(Roles.Manager) ? <MenuItem primaryText="Manage Users"/> : null}
                {user.hasRole(Roles.Admin) ? <MenuItem primaryText="Manage Timezones"/> : null}
                <MenuItem
                    primaryText="Sign out"
                    onClick={this.signOut}
                    disabled={user.isLoading}
                />
            </IconMenu>
        );
    }

    getLoggedOutEl() {
        return (
            <FlatButton label='Login' onClick={() => this.props.router.navigateTo(Routes.signIn)}/>
        );
    }

    render() {
        return (
            <AppBar
                title="Timezone"
                showMenuIconButton={false}
                titleStyle={{
                    cursor: 'pointer'
                }}
                iconElementRight={this.props.user.loggedIn ? this.getLoggedInEl() : this.getLoggedOutEl()}
                onTitleClick={() => this.props.router.navigateTo(Routes.home)}
            />
        )
    }

}
