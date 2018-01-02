import * as React from 'react';
import * as PropTypes from 'prop-types';

export class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {

    static contextTypes = {
        container: PropTypes.any
    };

}
