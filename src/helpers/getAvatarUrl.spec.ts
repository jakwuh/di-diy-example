import {User} from '../entities/User/User';
import {DEFAULT_AVATAR_URL, getAvatarUrl} from './getAvatarUrl';

test('getAvatarUrl', () => {
    let user = new User;
    user.avatarUrl = 'http://ad.sd/1';
    expect(getAvatarUrl(user)).toBe(user.avatarUrl);
    expect(getAvatarUrl(new User())).toBe(DEFAULT_AVATAR_URL);
});
