import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Backdrop from '../../modules/backdrop';
import Modal from '../../modules/modal';
import Form from '../../modules/form';
import { getFormData } from '../../utils';

import template from './sign-in.hbs';

type TSignIn = {
    backdrop: Backdrop;
    modal: Modal;
} & TBlockProps;

export default class SignIn extends Block<TSignIn> {

    constructor(props = {}) {
        super({
            ...props,
            backdrop: new Backdrop(),
            modal: new Modal({
                title: 'Вход',
                text: 'Нет аккаунта? <a href="/#sign-up">Регистрация</a>',
                body: new Form({
                    fields: [
                        {
                            type: 'text',
                            name: 'login',
                            label: 'Логин',
                            rules: ['required', 'login']
                        },
                        {
                            type: 'password',
                            name: 'password',
                            label: 'Пароль',
                            rules: ['required', 'password']
                        }
                    ],
                    button: {
                        type: 'submit',
                        mod: 'primary',
                        text: 'Войти'
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
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
