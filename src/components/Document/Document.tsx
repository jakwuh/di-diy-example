import * as React from 'react';
import {BaseComponent} from 'components/Common/BaseComponent';
import {DocumentHead} from 'components/Document/DocumentHead';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

export class DocumentProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    router: AbstractRouter;
}

export class Document extends BaseComponent<DocumentProps> {
    render() {
        return (
            <div id="container">
                <DocumentHead user={this.props.currentUser} router={this.props.router}/>
                {this.props.children}
            </div>
        );
    }
}
