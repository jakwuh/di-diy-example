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
export {default as Avatar} from 'material-ui/Avatar';
export {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
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


export const FacebookIcon = (props) => (
    <svg width="32px" height="32px" viewBox="0 0 60.734 60.733" style={{enableBackground: 'new 0 0 60.734 60.733'}}>
        <path
            d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914   v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462   v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z"
            fill="#4267b2"/>
    </svg>
);

export const GitHubIcon = (props) => (
    <svg viewBox="0 0 24 24" width="32px" height="32px">
        <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);
