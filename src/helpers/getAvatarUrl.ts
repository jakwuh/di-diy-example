import {CurrentUser} from '../entities/User/CurrentUser';

export const DEFAULT_AVATAR_URL = 'https://ucarecdn.com/980adde0-6612-40e8-a20a-0a3c9bc3239b/';

export const getAvatarUrl = (user: CurrentUser) =>
    user.avatarUrl || DEFAULT_AVATAR_URL;
