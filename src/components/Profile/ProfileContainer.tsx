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
import {Routes} from '../../routes';

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
    removePhoto() {
        this.onChangeImage(null);
    }

    @action.bound
    removeAccount() {
        this.props.currentUser.remove().then(() => {
            this.props.router.navigateTo(Routes.signIn);
        });
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
                    <CardTitle style={{maxWidth: 230, wordWrap: 'break-word', paddingBottom: 0}} title={currentUser.email}/>
                    <CardText>
                        <Uploader
                            value={imageUrl}
                            onChange={this.onChangeImage}
                        />
                    </CardText>
                    <CardActions>
                        {!currentUser.avatarUrl ? null : [
                            <RaisedButton
                                key="photo"
                                style={{marginBottom: 10}}
                                onClick={this.removePhoto}
                                label="Remove photo"
                                secondary
                            />,
                            <br key="photo-br"/>
                        ]}
                        <RaisedButton
                            key="account"
                            onClick={this.removeAccount}
                            label="Remove account"
                            secondary
                        />
                    </CardActions>

                </Card>
            </div>

        );
    }
}
