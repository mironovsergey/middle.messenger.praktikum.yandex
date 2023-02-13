import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Form from '../../modules/form';
import Button from '../../components/button';
import { getFormData } from '../../utils/helpers';

import template from './edit-profile.hbs';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

type TEditProfile = {
    title: string;
    backButton: Button;
    body: Form;
} & TBlockProps;

export default class EditProfile extends Block<TEditProfile> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Редактировать профиль',
            backButton: new Button({
                type: 'button',
                mod: 'link',
                text: `${iconBack}<span>Назад</span>`
            }),
            body: new Form({
                fields: [
                    {
                        type: 'text',
                        name: 'display_name',
                        label: 'Имя в чате',
                        rules: ['required', 'name']
                    },
                    {
                        type: 'text',
                        name: 'login',
                        label: 'Логин',
                        rules: ['required', 'login']
                    },
                    {
                        type: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        rules: ['required', 'name']
                    },
                    {
                        type: 'text',
                        name: 'second_name',
                        label: 'Фамилия',
                        rules: ['required', 'name']
                    },
                    {
                        type: 'email',
                        name: 'email',
                        label: 'Почта',
                        rules: ['required', 'email']
                    },
                    {
                        type: 'tel',
                        name: 'phone',
                        label: 'Телефон',
                        rules: ['required', 'phone']
                    }
                ],
                button: {
                    type: 'submit',
                    mod: 'primary',
                    text: 'Сохранить'
                },
                events: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();

                        const target = event.target as HTMLFormElement & {
                            isValid?: () => boolean
                        };

                        // TODO: Реализовать иной способ проверки корректности
                        // заполнения полей формы
                        if (typeof target.isValid === 'function' && target.isValid()) {
                            console.log(getFormData(event.target as HTMLFormElement));
                        }
                    }
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
