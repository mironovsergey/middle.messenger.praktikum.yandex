import button from '../../components/button';

import profileSettings from './modules/profile-settings';
import profileData from './modules/profile-data';

import template from './profile.hbs';

import './profile.scss';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

const title = 'Мой профиль';

export default ({ user }) => {
    const userData = user.filter(({ name }) => name !== 'image');

    return template({
        title,
        backButton: button({
            type: 'button',
            mod: 'link',
            text: `${iconBack}<span>Назад</span>`
        }),
        profileSettings: profileSettings(user),
        profileData: profileData(userData)
    });
};
