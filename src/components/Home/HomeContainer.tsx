import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {Inject} from 'typedi';
import {ZonesState} from '../../states/ZonesState';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, DoneIcon} from 'components/ui.tsx';
import {ZoneTableRow} from './ZoneTableRow';
import {CurrentZone} from '../../entities/Zone/CurrentZone';
import {CurrentZones} from '../../entities/Zone/CurrentZones';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {setInterval} from 'timers';
import Timer = NodeJS.Timer;
import * as debounce from 'lodash/debounce';
import {FilterIcon, TextField, blue500} from 'components/ui';

export class HomeContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: ZonesState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter;

    @Inject()
    zones: CurrentZones;
}

@observer
export class HomeContainer extends BaseComponent<HomeContainerProps> {
    @observable filterOpened: boolean = false;
    @observable name: string = '';
    @observable currentTime: Date;
    timer: Timer;

    constructor(props: HomeContainerProps) {
        super(props);

        this.currentTime = new Date();

        this.fetchZones = debounce(this.fetchZones, 100, {leading: false, trailing: true});

        this.timer = setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    }

    @action.bound
    openFilter() {
        this.filterOpened = true;
    }

    @action.bound
    closeFilter() {
        this.filterOpened = false;
    }

    fetchZones() {
        this.props.zones.fetch({
            params: {
                q: this.name
            }
        }).catch(console.error);
    }

    @action.bound
    onChangeName(event) {
        this.name = event.currentTarget.value;
        this.fetchZones();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getNameHeaderColumn() {
        if (this.filterOpened) {
            return [
                <TextField
                    id="home-zone-name"
                    key="input"
                    name="name"
                    type="text"
                    value={this.name}
                    placeholder="Start typing name ..."
                    onChange={this.onChangeName}
                />,
                <DoneIcon key="done" hoverColor={blue500} onClick={this.closeFilter}/>
            ]
        } else {
            return [
                <span key="name">Name</span>,
                <FilterIcon key="filter" hoverColor={blue500} onClick={this.openFilter}/>
            ]
        }
    }

    render() {
        let {zones, currentUser} = this.props;

        let filteredZones = zones.filter(zone => zone.name.includes(this.name));

        return (
            <Table style={{position: 'relative'}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>{this.getNameHeaderColumn()}</TableHeaderColumn>
                        <TableHeaderColumn>Offset</TableHeaderColumn>
                        <TableHeaderColumn>City</TableHeaderColumn>
                        <TableHeaderColumn/>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {filteredZones.map(zone => {
                        return (
                            <ZoneTableRow
                                key={zone.id}
                                zone={zone}
                                zones={zones}
                                currentUser={currentUser}
                                currentTimeProvider={this}
                            />
                        );
                    })}
                    <ZoneTableRow
                        key={Date.now()}
                        zone={new CurrentZone(zones.request)}
                        zones={zones}
                        currentUser={currentUser}
                        currentTimeProvider={this}
                    />
                </TableBody>
            </Table>
        );
    }
}
