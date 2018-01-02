import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from 'typedi';

interface ProviderProps {
    container: Container;
}

export class Provider extends React.Component<ProviderProps> {

    static contextTypes = {
        muiTheme: PropTypes.any
    };

    static childContextTypes = {
        container: PropTypes.any,
        muiTheme: PropTypes.any
    };

    getChildContext() {
        return {
            container: this.props.container,
            muiTheme: this.context.muiTheme
        };
    }

    render() {
        return this.props.children;
    }

}
