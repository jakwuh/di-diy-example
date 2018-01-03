import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {BaseComponent} from '../Common/BaseComponent';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {Routes} from '../../routes';
import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu, Avatar} from 'components/ui.tsx';
import {observer} from 'mobx-react';
import {Roles} from '../../enums';
import {action} from 'mobx';
import {CurrentUser} from '../../entities/User/CurrentUser';

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

    @action.bound
    manageUsers() {
        this.props.router.navigateTo(Routes.manageUsers);
    }

    @action.bound
    manageZones() {
        this.props.router.navigateTo(Routes.manageZones);
    }

    @action.bound
    profile() {
        this.props.router.navigateTo(Routes.profile);
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

                {!user.hasRole(Roles.Manager) ? null :
                    <MenuItem
                        primaryText="Manage Users"
                        onClick={this.manageUsers}
                    />
                }
                {!user.hasRole(Roles.Admin) ? null :
                    <MenuItem
                        primaryText="Manage Timezones"
                        onClick={this.manageZones}
                    />
                }
                <MenuItem
                    primaryText="Profile"
                    onClick={this.profile}
                    disabled={user.isLoading}
                />
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
        let {user} = this.props;

        return (
            <AppBar
                title="Timezone"
                showMenuIconButton={false}
                titleStyle={{
                    cursor: 'pointer'
                }}
                iconElementRight={this.props.user.loggedIn ? this.getLoggedInEl() : this.getLoggedOutEl()}
                onTitleClick={() => this.props.router.navigateTo(Routes.home)}
            >
                {!user.loggedIn ? null :
                    <Avatar onClick={this.profile} src={user.avatarUrl} style={{
                        position: 'absolute',
                        right: 50,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer'
                    }}/>
                }
            </AppBar>
        )
    }

}
