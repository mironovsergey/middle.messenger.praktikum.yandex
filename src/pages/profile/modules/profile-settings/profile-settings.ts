import type { TUser } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Button from '../../../../components/button';
import ProfileImage from '../profile-image';

import template from './profile-settings.hbs';

import './profile-settings.scss';

type TProfileSettings = {
    profileName: string;
    profileImage: ProfileImage;
    editProfileButton: Button;
    changePasswordButton: Button;
    exitButton: Button;
} & TBlockProps;

type TProfileSettingsProps = {
    userData: TUser;
} & TBlockProps;

export default class ProfileSettings extends Block<TProfileSettings> {

    constructor({ userData: { avatar, display_name: name }, ...props }: TProfileSettingsProps) {
        super({
            ...props,
            profileName: name,
            profileImage: new ProfileImage({ avatar, name }),
            editProfileButton: new Button({
                type: 'button',
                mod: 'default',
                size: 'small',
                text: 'Редактировать профиль'
            }),
            changePasswordButton: new Button({
                type: 'button',
                mod: 'default',
                size: 'small',
                text: 'Изменить пароль'
            }),
            exitButton: new Button({
                type: 'button',
                mod: 'danger',
                size: 'small',
                text: 'Выйти'
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
