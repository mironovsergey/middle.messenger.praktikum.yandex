import type { TBlockProps } from '../../services/block';
import type { TPasswordRequest } from '../../utils/types';
import { IHTMLFormElementWithValidator } from '../../services/validator';
import UserController from '../../controllers/user-controller';
import Block from '../../services/block';
import Form from '../../modules/form';
import Button from '../../components/button';
import Router from '../../services/router';
import { getFormData } from '../../utils';

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
                text: `${iconBack}<span>Назад</span>`,
                events: {
                    click: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        Router.getInstance().back();
                    }
                }
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

                        const target = event.target as IHTMLFormElementWithValidator;

                        if (typeof target.isValid === 'function' && target.isValid()) {
                            const formData = getFormData(target as HTMLFormElement);

                            UserController.password(formData as TPasswordRequest).finally(() => {
                                target.reset();
                            });
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
