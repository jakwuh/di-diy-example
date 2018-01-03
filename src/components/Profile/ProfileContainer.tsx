import * as React from 'react';
import {BaseComponent} from '../Common/BaseComponent';
import {CurrentUser} from '../../entities/User/CurrentUser';
import {Inject} from 'typedi';
import {AbstractRouter} from '../../libs/Router/AbstractRouter';
import {
    Card,
    CardMedia,
    CardTitle,
    CardText,
    CardActions,
    RaisedButton
} from 'components/ui.tsx';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import Uploader from '../Common/Uploader';
import {ProfileState} from '../../states/ProfileState';
import {getAvatarUrl} from '../../helpers/getAvatarUrl';

export class ProfileContainerProps {
    @Inject()
    currentUser: CurrentUser;

    @Inject()
    routeState: ProfileState;

    @Inject(() => AbstractRouter)
    router: AbstractRouter;
}

@observer
export class ProfileContainer extends BaseComponent<ProfileContainerProps> {
    @action.bound
    onChangeImage(url: string | null) {
        let {currentUser} = this.props;

        currentUser.avatarUrl = url;
        currentUser.save().catch(console.error);
    }

    @action.bound
    remove() {
        this.onChangeImage(null);
    }

    render() {
        let {currentUser} = this.props;
        let imageUrl = getAvatarUrl(currentUser);

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'column'
            }}>
                <Card>
                    <CardMedia>
                        <img src={imageUrl} alt=""/>
                    </CardMedia>
                    <CardTitle title="Upload profile photo"/>
                    <CardText>
                        <Uploader
                            value={imageUrl}
                            onChange={this.onChangeImage}
                        />
                    </CardText>
                    {!currentUser.avatarUrl ? null :
                        <CardActions>
                            <RaisedButton
                                onClick={this.remove}
                                label="Remove"
                                secondary
                            />
                        </CardActions>
                    }
                </Card>
            </div>

        );
    }
}
