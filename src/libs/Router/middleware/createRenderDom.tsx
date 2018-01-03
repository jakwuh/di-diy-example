import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'components/Common/Provider';
import {Document, DocumentProps} from 'components/Document/Document';
import * as React from 'react';
import {containerConfig} from 'routes';
import {ContainerInstance} from 'typedi';
import * as pick from 'lodash/pick';
import {CurrentUser} from '../../../entities/User/CurrentUser';
import {AbstractRouter} from '../AbstractRouter';
import {DocumentWrapper} from '../../../components/Document/DocumentWrapper';

async function resolveComponent(container, Component, ComponentProps) {
    let componentProps = await container.get(ComponentProps);
    let props = pick(componentProps, Object.getOwnPropertyNames(componentProps));

    return (rootProps) => {
        return <Component {...props} {...rootProps}/>
    };
}

export function createRenderDom({hydrate, render, router}: {hydrate?, render, router: AbstractRouter}) {
    return async (event) => {
        let container = event.container as ContainerInstance;

        let {
            Component,
            ComponentProps,
            check,
            fallback
        } = containerConfig[event.name];

        let currentUser = await container.get(CurrentUser);

        if (!check(currentUser, event)) {
            event.redirectTo = router.reverse(fallback);
            return;
        }

        let [
            ResolvedDocument,
            ResolvedComponent
        ] = await Promise.all([
            resolveComponent(container, Document, DocumentProps),
            resolveComponent(container, Component, ComponentProps)
        ]);

        let dom = (
            <MuiThemeProvider>
                <Provider container={container}>
                    <ResolvedDocument>
                        <ResolvedComponent/>
                    </ResolvedDocument>
                </Provider>
            </MuiThemeProvider>
        );

        if (IS_SERVER) {
            let documentDom = <DocumentWrapper>{dom}</DocumentWrapper>;
            event.body = render(documentDom);
        } else {
            let renderFn = event.isFirstRender ? hydrate! : render;

            renderFn(dom, document.getElementById('container'));
        }
    };
}

