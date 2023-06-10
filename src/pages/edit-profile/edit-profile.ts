import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Form from '../../modules/form';
import Button from '../../components/button';
import Router from '../../services/router';

import template from './edit-profile.hbs';

import iconBack from '../../images/icons/back.svg';

type TEditProfile = {
    title: string;
    backButton: Button;
    body?: Form;
} & TBlockProps;

export default class EditProfile extends Block<TEditProfile> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Редактировать профиль',
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
