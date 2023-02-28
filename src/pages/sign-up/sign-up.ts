import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Backdrop from '../../modules/backdrop';
import Modal from '../../modules/modal';
import Form from '../../modules/form';
import { getFormData } from '../../utils';

import template from './sign-up.hbs';

type TSignUp = {
    backdrop: Backdrop;
    modal: Modal;
} & TBlockProps;

export default class SignUp extends Block<TSignUp> {

    constructor(props = {}) {
        super({
            ...props,
            backdrop: new Backdrop(),
            modal: new Modal({
                title: 'Регистрация',
                text: 'Уже есть аккаунт? <a href="/#sign-in">Войти</a>',
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
                            rules: ['phone']
                        },
                        {
                            type: 'password',
                            name: 'password',
                            label: 'Пароль',
                            rules: ['required', 'password']
                        },
                        {
                            type: 'password',
                            name: 'password_confirm',
                            label: 'Пароль (Еще раз)',
                            rules: ['required', 'password']
                        }
                    ],
                    button: {
                        type: 'submit',
                        mod: 'primary',
                        text: 'Зарегистрироваться'
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
