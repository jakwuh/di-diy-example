import * as React from 'react';
import {BaseComponent} from 'components/Common/BaseComponent';
import {DocumentHead} from 'components/Document/DocumentHead';
import {DocumentRestoreData} from 'components/Document/DocumentRestoreData';
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
            <html>
            <head>
                <meta charSet="utf8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>Timezone App</title>
                <link rel="stylesheet" href="/assets/styles.css"/>
            </head>
            <body>
            <DocumentHead user={this.props.currentUser} router={this.props.router}/>
            {this.props.children}
            {IS_SERVER && <DocumentRestoreData restoreData={{}}/>}
            {IS_SERVER && <script src="/assets/index.js"/>}
            </body>
            </html>
        )
    }
}
