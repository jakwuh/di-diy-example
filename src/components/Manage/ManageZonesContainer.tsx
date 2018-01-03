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
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'components/ui';
import {ManageZonesTableRow} from 'components/Manage/ManageZonesTableRow';
import {User} from '../../entities/User/User';
import {ManageZonesState} from '../../states/ManageZonesState';
import {AdminZones} from '../../entities/Zone/AdminZones';
import {AdminZone} from '../../entities/Zone/AdminZone';

export class ManageZonesContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    users: Users;

    @Inject()
    zones: AdminZones;

    @Inject()
    routeState: ManageZonesState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter
}

@observer
export class ManageZonesContainer extends BaseComponent<ManageZonesContainerProps> {
    render() {
        let {users, zones, currentUser} = this.props;

        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Offset</TableHeaderColumn>
                        <TableHeaderColumn>City</TableHeaderColumn>
                        <TableHeaderColumn>User</TableHeaderColumn>
                        <TableHeaderColumn/>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {zones.map(zone => {
                        return (
                            <ManageZonesTableRow
                                key={zone.id}
                                zone={zone}
                                users={users}
                                zones={zones}
                                currentUser={currentUser}
                            />
                        );
                    })}
                    {!users.length
                        ? <TableRow>No users available.</TableRow>
                        : <ManageZonesTableRow
                            key="new"
                            zone={new AdminZone(zones.request)}
                            zones={zones}
                            users={users}
                            currentUser={currentUser}
                        />
                    }
                </TableBody>
            </Table>
        );
    }
}
