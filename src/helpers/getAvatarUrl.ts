import {CurrentUser} from '../entities/User/CurrentUser';

export const getAvatarUrl = (user: CurrentUser) =>
    user.avatarUrl || 'https://ucarecdn.com/980adde0-6612-40e8-a20a-0a3c9bc3239b/';
