import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {User} from '../../entities/User/User';
import {TableRow, TableRowColumn, RaisedButton, TextField, SelectField, MenuItem} from 'components/ui.tsx';
import {observer} from 'mobx-react';
import {Users} from '../../entities/User/Users';
import {action, computed, observable} from 'mobx';
import {isEqual} from 'lodash';
import {Roles, RolesNames} from '../../enums';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {validateEmail} from '../../helpers/validation';
import {AdminUser} from '../../entities/User/AdminUser';
import {AdminUsers} from '../../entities/User/AdminUsers';

interface ManageUsersTableRowProps {
    user: AdminUser;
    users: AdminUsers;
    currentUser: CurrentUser;
}

@observer
export class ManageUsersTableRow extends BaseComponent<ManageUsersTableRowProps> {
    @observable isEditing: boolean;
    @observable userJson: any;

    constructor(props: ManageUsersTableRowProps) {
        super(props);

        this.isEditing = props.user.isNew;
        this.userJson = props.user.toJSON();
    }

    @computed get isLoading() {
        return this.props.users.isLoading || this.props.user.isLoading;
    }

    @computed get isEdited() {
        let {user, users} = this.props;

        let otherUsers = users.filter(model => model.id !== user.id);

        return !validateEmail(user) && !otherUsers.find(_user => _user.email === user.email) && (
            user.isNew || !isEqual(this.userJson, user.toJSON())
        );
    }

    @action.bound
    remove(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.users.remove(this.props.user).catch(console.error);
    }

    @action.bound
    saveOrInvite(event, promiseFactory) {
        event.preventDefault();
        event.stopPropagation();

        let isNew = this.props.user.isNew;

        promiseFactory().then(() => {
            if (isNew) {
                this.props.users.push(this.props.user);
            }

            this.userJson = this.props.user.toJSON();
            this.isEditing = false;
        }, console.error);
    }

    @action.bound
    save(event) {
        this.saveOrInvite(event, () => this.props.user.saveAdmin());
    }

    @action.bound
    invite(event) {
        this.saveOrInvite(event, () => this.props.user.invite());
    }

    @action.bound
    edit() {
        this.isEditing = true;
    }

    @action.bound
    onChangeEmail(event) {
        this.props.user.email = event.currentTarget.value;
    }

    @action.bound
    onChangeLoginAttempts(event) {
        this.props.user.loginAttempts = Number(event.currentTarget.value);
    }

    @action.bound
    onChangeRole(event, index, value) {
        this.props.user.role = value;
    }

    getEmailColumn() {
        let {user} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    name="email"
                    type="email"
                    value={user.email || ''}
                    onChange={this.onChangeEmail}
                />
            );
        } else {
            return user.email;
        }
    }

    getLoginAttemptsColumn() {
        let {user} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    name="loginAttempts"
                    type="number"
                    min="0"
                    value={user.loginAttempts}
                    onChange={this.onChangeLoginAttempts}
                />
            );
        } else {
            return user.loginAttempts;
        }
    }

    getRolesColumn() {
        let {user, currentUser} = this.props;

        let allowedRoles: string[] = Object.keys(Roles).filter(role => currentUser.hasRole(Roles[role]));

        if (this.isEditing) {
            return (
                <SelectField
                    value={user.role}
                    onChange={this.onChangeRole}
                >
                    {allowedRoles.map(role => {
                        return <MenuItem
                            key={role}
                            value={Roles[role]}
                            primaryText={RolesNames[Roles[role]]}
                        />
                    })}
                </SelectField>
            );
        } else {
            return RolesNames[user.role];
        }
    }

    render() {
        let {user, currentUser} = this.props;

        return (
            <TableRow onClick={this.edit}>
                <TableRowColumn>{this.getEmailColumn()}</TableRowColumn>
                <TableRowColumn>{this.getRolesColumn()}</TableRowColumn>
                <TableRowColumn>{this.getLoginAttemptsColumn()}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.save}
                        style={{marginRight: 10}}
                        label="Save"
                        disabled={this.isLoading || !this.isEdited}
                        primary
                    />
                    {!user.isNew || !currentUser.hasRole(Roles.Admin) ? null :
                        <RaisedButton
                            onClick={this.invite}
                            style={{marginRight: 10}}
                            label="Invite"
                            disabled={this.isLoading || !this.isEdited}
                            primary
                        />}
                    {user.isNew ? null :
                        <RaisedButton
                            onClick={this.remove}
                            label="Delete"
                            disabled={this.isLoading}
                            secondary
                        />}
                </TableRowColumn>
            </TableRow>
        );
    }

}
