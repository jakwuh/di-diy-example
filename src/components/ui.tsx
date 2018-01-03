import * as React from 'react';
import {default as SvgIcon} from 'material-ui/SvgIcon';

export {default as TextField} from 'material-ui/TextField';
export {default as RaisedButton} from 'material-ui/RaisedButton';
export {default as Paper} from 'material-ui/Paper';
export {default as FlatButton} from 'material-ui/FlatButton';
export {default as IconMenu} from 'material-ui/IconMenu';
export {default as IconButton} from 'material-ui/IconButton';
export {default as MenuItem} from 'material-ui/MenuItem';
export {default as SelectField} from 'material-ui/SelectField';
export {default as SvgIcon} from 'material-ui/SvgIcon';
export {Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody} from 'material-ui/Table';
export {default as MoreVertIcon} from 'material-ui/svg-icons/navigation/more-vert';
export {blue500} from 'material-ui/styles/colors';

const headerColumnIconStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    cursor: 'pointer'
};

export const FilterIcon = (props) => (
    <SvgIcon {...props} style={headerColumnIconStyles}>
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
);

export const DoneIcon = (props) => (
    <SvgIcon {...props} style={headerColumnIconStyles}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </SvgIcon>
);
