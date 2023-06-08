import type { TBlockProps } from '../../services/block';
import type { TSignUpRequest } from '../../utils/types';
import { IHTMLFormElementWithValidator } from '../../services/validator';
import AuthController from '../../controllers/auth-controller';
import Block from '../../services/block';
import Router from '../../services/router';
import Form from '../../modules/form';
import { getFormData } from '../../utils';
import { RoutePaths } from '../../utils/constants';
import { checkAuth } from '../../services/auth';

import template from './sign-up.hbs';

type TSignUp = {
    title: string;
    text: string;
    body: Form;
} & TBlockProps;

export default class SignUp extends Block<TSignUp> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Регистрация',
            text: `Уже есть аккаунт? <a href="${RoutePaths.SignIn}">Войти</a>`,
            body: new Form({
                fields: [
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
                        type: 'text',
                        name: 'login',
                        label: 'Логин',
                        rules: ['required', 'login']
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

                        const target = event.target as IHTMLFormElementWithValidator;

                        if (typeof target.isValid === 'function' && target.isValid()) {
                            const formData = getFormData(target as HTMLFormElement);
                            const { password_confirm: confirm, ...data } = formData;

                            AuthController.signup(data as TSignUpRequest);
                        }
                    }
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

    componentDidMount() {
        this.checkAuth();
    }

    async checkAuth() {
        const isAuth = await checkAuth();

        if (isAuth) {
            Router.getInstance().go(RoutePaths.Messenger);
        }
    }

}
