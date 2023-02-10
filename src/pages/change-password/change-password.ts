import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Form from '../../modules/form';
import Button from '../../components/button';
import { getFormData } from '../../utils/helpers';

import template from './change-password.hbs';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

type TChangePassword = {
    title: string;
    backButton: Button;
    body: Form;
} & TBlockProps;

export default class ChangePassword extends Block<TChangePassword> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Изменить пароль',
            backButton: new Button({
                type: 'button',
                mod: 'link',
                text: `${iconBack}<span>Назад</span>`
            }),
            body: new Form({
                fields: [
                    {
                        type: 'password',
                        name: 'oldPassword',
                        label: 'Старый пароль',
                        rules: ['required', 'password']
                    },
                    {
                        type: 'password',
                        name: 'newPassword',
                        label: 'Новый пароль',
                        rules: ['required', 'password']
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
