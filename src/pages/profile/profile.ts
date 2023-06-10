import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Button from '../../components/button';
import Router from '../../services/router';

import { ProfileSettings } from './modules/profile-settings';
import { ProfileData } from './modules/profile-data';

import template from './profile.hbs';

import iconBack from '../../images/icons/back.svg';

type TProfile = {
    title: string;
    backButton: Button;
    profileSettings?: ProfileSettings;
    profileData?: ProfileData;
} & TBlockProps;

export default class Profile extends Block<TProfile> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Мой профиль',
            backButton: new Button({
                type: 'button',
                mod: 'link',
                text: `${iconBack}<span>Назад</span>`,
                events: {
                    click: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        Router.getInstance().back();
                    }
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
