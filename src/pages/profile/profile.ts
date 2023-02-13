import type { TUser } from '../../utils/types';
import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Button from '../../components/button';

import ProfileSettings from './modules/profile-settings';
import ProfileData from './modules/profile-data';

import template from './profile.hbs';

import './profile.scss';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

type TProfile = {
    title: string;
    backButton: Button;
    profileSettings: ProfileSettings;
    profileData: ProfileData;
} & TBlockProps;

type TProfileProps = {
    userData: TUser;
} & TBlockProps;

export default class Profile extends Block<TProfile> {

    constructor({ userData, ...props }: TProfileProps) {
        super({
            ...props,
            title: 'Мой профиль',
            backButton: new Button({
                type: 'button',
                mod: 'link',
                text: `${iconBack}<span>Назад</span>`
            }),
            profileSettings: new ProfileSettings({ userData }),
            profileData: new ProfileData({ userData })
        });
    }

    render() {
        return this.compile(template);
    }

}
