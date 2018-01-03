import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {validateForgotParams} from '../../helpers/validation';
import {ValidationErrors} from 'validatorjs';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {UserForgotState} from '../../states/UserForgotState';
import {Users} from '../../entities/User/Users';
import {ManageUsersState} from '../../states/ManageUsersState';
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'components/ui.tsx';
import {ManageUsersTableRow} from 'components/Manage/ManageUsersTableRow';
import {User} from '../../entities/User/User';
import {AdminUsers} from '../../entities/User/AdminUsers';
import {AdminUser} from '../../entities/User/AdminUser';

export class ManageUsersContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    users: AdminUsers;

    @Inject()
    routeState: ManageUsersState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class ManageUsersContainer extends BaseComponent<ManageUsersContainerProps> {
    render() {
        let {users, currentUser} = this.props;

        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                        <TableHeaderColumn>Login attempts</TableHeaderColumn>
                        <TableHeaderColumn/>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {users.map((user: AdminUser) => {
                        return (
                            <ManageUsersTableRow
                                key={user.id}
                                user={user}
                                users={users}
                                currentUser={currentUser}
                            />
                        );
                    })}
                    <ManageUsersTableRow
                        key="new"
                        user={new AdminUser(users.request)}
                        users={users}
                        currentUser={currentUser}
                    />
                </TableBody>
            </Table>
        );
    }
}
