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
import {AdminZone} from '../../entities/Zone/AdminZone';
import {AdminZones} from '../../entities/Zone/AdminZones';
import {AdminUsers} from '../../entities/User/AdminUsers';

interface ManageZonesTableRowProps {
    zone: AdminZone;
    zones: AdminZones;
    users: AdminUsers;
    currentUser: CurrentUser;
}

@observer
export class ManageZonesTableRow extends BaseComponent<ManageZonesTableRowProps> {
    @observable isEditing: boolean;
    @observable zoneJson: any;

    constructor(props: ManageZonesTableRowProps) {
        super(props);

        this.isEditing = props.zone.isNew;
        this.zoneJson = props.zone.toJSON();
    }

    @computed get isLoading() {
        return this.props.zones.isLoading || this.props.zone.isLoading;
    }

    @computed get isEdited() {
        let {zone} = this.props;

        return zone.city && zone.name && zone.user
            && (zone.isNew || !isEqual(this.zoneJson, zone.toJSON()));
    }

    @action.bound
    remove(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.zones.remove(this.props.zone).catch(console.error);
    }


    @action.bound
    save(event) {
        event.preventDefault();
        event.stopPropagation();

        let {zone, zones} = this.props;
        let isNew = zone.isNew;

        zone.save().then(() => {
            if (isNew) {
                zones.push(zone);
            }

            this.zoneJson = zone.toJSON();
            this.isEditing = false;
        }, console.error);
    }

    @action.bound
    edit() {
        this.isEditing = true;
    }

    @action.bound
    onChangeName(event) {
        this.props.zone.name = event.currentTarget.value;
    }

    @action.bound
    onChangeCity(event) {
        this.props.zone.city = event.currentTarget.value;
    }

    @action.bound
    onChangeOffset(event) {
        this.props.zone.offset = Number(event.currentTarget.value);
    }

    @action.bound
    onBlurOffset() {
        this.props.zone.offset = Math.max(-12, Math.min(12, this.props.zone.offset))
    }

    @action.bound
    onChangeUser(event, index, value) {
        this.props.zone.user = value;
    }

    getNameColumn() {
        let {zone} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    id="manage-zones-name"
                    name="name"
                    type="text"
                    value={zone.name || ''}
                    onChange={this.onChangeName}
                />
            );
        } else {
            return zone.name;
        }
    }

    getCityColumn() {
        let {zone} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    id="manage-zones-city"
                    name="city"
                    type="text"
                    value={zone.city || ''}
                    onChange={this.onChangeCity}
                />
            );
        } else {
            return zone.city;
        }
    }

    getOffsetColumn() {
        let {zone} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    id="manage-zones-offset"
                    name="offset"
                    type="number"
                    min="-12"
                    max="12"
                    value={zone.offset}
                    onChange={this.onChangeOffset}
                    onBlur={this.onBlurOffset}
                />
            );
        } else {
            return zone.offset;
        }
    }

    getUserColumn() {
        let {zone, users} = this.props;

        if (this.isEditing) {
            return (
                <SelectField
                    value={zone.user && users.find(user => user.id === zone.user.id)}
                    onChange={this.onChangeUser}
                >
                    {users.map(user => {
                        return <MenuItem
                            key={user.id}
                            value={user}
                            primaryText={user.email}
                        />
                    })}
                </SelectField>
            );
        } else {
            return zone.user && zone.user.email;
        }
    }

    render() {
        let {zone} = this.props;

        return (
            <TableRow onClick={this.edit}>
                <TableRowColumn>{this.getNameColumn()}</TableRowColumn>
                <TableRowColumn>{this.getOffsetColumn()}</TableRowColumn>
                <TableRowColumn>{this.getCityColumn()}</TableRowColumn>
                <TableRowColumn>{this.getUserColumn()}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.save}
                        style={{marginRight: 10}}
                        label="Save"
                        disabled={this.isLoading || !this.isEdited}
                        primary
                    />
                    {zone.isNew ? null :
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
