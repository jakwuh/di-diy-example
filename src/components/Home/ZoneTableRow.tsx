import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {TableRow, TableRowColumn, RaisedButton, TextField, SelectField, MenuItem} from 'components/ui.tsx';
import {observer, Observer} from 'mobx-react';
import {action, computed, observable} from 'mobx';
import {isEqual} from 'lodash';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {range} from 'lodash';
import {CurrentZones} from '../../entities/Zone/CurrentZones';
import {CurrentZone} from '../../entities/Zone/CurrentZone';
import {offsetCurrentTimeFactory, offsetToGMT} from '../../helpers/formatTime';
import {format, addHours} from 'date-fns';
import {ReactElement} from 'react';

interface ZoneTableRowProps {
    zone: CurrentZone;
    zones: CurrentZones;
    currentUser: CurrentUser;
    currentTimeProvider: {
        currentTime: Date;
    }
}

@observer
export class ZoneTableRow extends BaseComponent<ZoneTableRowProps> {
    @observable isEditing: boolean;
    @observable zoneJson: any;

    constructor(props: ZoneTableRowProps) {
        super(props);

        this.isEditing = props.zone.isNew;
        this.zoneJson = props.zone.toJSON();
    }

    @computed get isLoading() {
        return this.props.zones.isLoading || this.props.zone.isLoading;
    }

    @computed get isEdited() {
        let {zone} = this.props;

        return zone.city && zone.name
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
    cancel(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.zone.setAttributes(this.zoneJson);
        this.isEditing = false;
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
    onChangeOffset(event, index, value) {
        this.props.zone.offset = value;
    }

    getNameColumn() {
        let {zone} = this.props;

        if (this.isEditing) {
            return (
                <TextField
                    id="home-zone-edit-name"
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
                    id="home-zone-edit-city"
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
                <SelectField
                    id="home-zone-select-offset"
                    name="offset"
                    maxHeight={200}
                    value={zone.offset}
                    onChange={this.onChangeOffset}
                >
                    {range(-12, 13).map(value => {
                        return <MenuItem
                            key={value}
                            value={value}
                            primaryText={offsetToGMT(value)}
                        />
                    })}
                </SelectField>
            );
        } else {
            return offsetToGMT(zone.offset)
        }
    }

    getLastColumn() {
        let {zone, currentTimeProvider} = this.props;

        let offsetCurrentTime = offsetCurrentTimeFactory(zone.offset);

        if (this.isEditing) {
            return (
                [(
                    <RaisedButton
                        key="save"
                        onClick={this.save}
                        style={{marginRight: 10}}
                        label="Save"
                        disabled={this.isLoading || !this.isEdited}
                        primary
                    />
                ), (
                    zone.isNew ? null :
                        <RaisedButton
                            key="delete"
                            onClick={this.remove}
                            style={{marginRight: 10}}
                            label="Delete"
                            disabled={this.isLoading}
                            secondary
                        />
                ), (
                    zone.isNew ? null :
                        <RaisedButton
                            key="cancel"
                            onClick={this.cancel}
                            label="Cancel"
                            disabled={this.isLoading}
                        />
                )]
            )
        } else {
            return (
                <Observer>
                    {() => offsetCurrentTime(currentTimeProvider.currentTime) as any}
                </Observer>
            )
        }
    }

    render() {
        let {zone} = this.props;

        return (
            <TableRow onClick={this.edit}>
                <TableRowColumn>{this.getNameColumn()}</TableRowColumn>
                <TableRowColumn>{this.getOffsetColumn()}</TableRowColumn>
                <TableRowColumn>{this.getCityColumn()}</TableRowColumn>
                <TableRowColumn>{this.getLastColumn()}</TableRowColumn>
            </TableRow>
        );
    }

}
