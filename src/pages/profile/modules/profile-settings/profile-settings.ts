import type { TBlockProps } from '../../../../services/block';
import AuthController from '../../../../controllers/auth-controller';
import Block from '../../../../services/block';
import Button from '../../../../components/button';
import ProfileImage from '../profile-image';
import Router from '../../../../services/router';
import { RoutePaths } from '../../../../utils/constants';

import template from './profile-settings.hbs';

import './profile-settings.scss';

type TProfileSettings = {
    profileName?: string;
    profileImage?: ProfileImage;
    editProfileButton: Button;
    changePasswordButton: Button;
    exitButton: Button;
} & TBlockProps;

export default class ProfileSettings extends Block<TProfileSettings> {

    constructor(props = {}) {
        super({
            ...props,
            editProfileButton: new Button({
                type: 'button',
                mod: 'default',
                size: 'small',
                text: 'Редактировать профиль',
                events: {
                    click: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        Router.getInstance().go(RoutePaths.EditProfile);
                    }
                }
            }),
            changePasswordButton: new Button({
                type: 'button',
                mod: 'default',
                size: 'small',
                text: 'Изменить пароль',
                events: {
                    click: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        Router.getInstance().go(RoutePaths.ChangePassword);
                    }
                }
            }),
            exitButton: new Button({
                type: 'button',
                mod: 'danger',
                size: 'small',
                text: 'Выйти',
                events: {
                    click: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        AuthController.logout();
                    }
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
