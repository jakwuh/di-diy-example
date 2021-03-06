import * as React from 'react';
import {BaseComponent} from 'components/Common/BaseComponent';
import {DocumentHead} from 'components/Document/DocumentHead';
import {DocumentRestoreData} from 'components/Document/DocumentRestoreData';
import {Inject} from 'typedi';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';

export class DocumentWrapper extends BaseComponent {
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
            <div id="container">
                {this.props.children}
            </div>
            {IS_SERVER &&
            <script dangerouslySetInnerHTML={{__html: `UPLOADCARE_PUBLIC_KEY = '${UPLOADCARE_PUBLIC_KEY}';`}}/>}
            {IS_SERVER && <DocumentRestoreData restoreData={{}}/>}
            {IS_SERVER && <script src="/assets/index.js"/>}
            </body>
            </html>
        );
    }
}
