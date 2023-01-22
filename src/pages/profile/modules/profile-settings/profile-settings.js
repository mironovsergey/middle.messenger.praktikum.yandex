import button from '../../../../components/button';

import profileImage from '../profile-image';

import template from './profile-settings.hbs';

import './profile-settings.scss';

export default (user) => {
    return template({
        profileName: user.find((item) => item.name === 'display_name').value,
        profileImage: profileImage(user.find((item) => item.name === 'avatar')),
        editProfileButton: button({
            type: 'button',
            mod: 'default',
            size: 'small',
            text: 'Редактировать профиль'
        }),
        changePasswordButton: button({
            type: 'button',
            mod: 'default',
            size: 'small',
            text: 'Изменить пароль'
        }),
        exitButton: button({
            type: 'button',
            mod: 'danger',
            size: 'small',
            text: 'Выйти'
        })
    });
};
