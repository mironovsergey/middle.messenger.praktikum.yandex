import type { TBlockProps } from '../../services/block';
import type { TSignInRequest } from '../../utils/types';
import { IHTMLFormElementWithValidator } from '../../services/validator';
import AuthController from '../../controllers/auth-controller';
import Block from '../../services/block';
import Router from '../../services/router';
import Form from '../../modules/form';
import { getFormData } from '../../utils';
import { RoutePaths } from '../../utils/constants';
import { checkAuth } from '../../services/auth';

import template from './sign-in.hbs';

type TSignIn = {
    title: string;
    text: string;
    body: Form;
} & TBlockProps;

export default class SignIn extends Block<TSignIn> {

    constructor(props = {}) {
        super({
            ...props,
            title: 'Вход',
            text: `Нет аккаунта? <a href="${RoutePaths.SignUp}">Регистрация</a>`,
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

                        const target = event.target as IHTMLFormElementWithValidator;

                        if (typeof target.isValid === 'function' && target.isValid()) {
                            const formData = getFormData(target as HTMLFormElement);

                            AuthController.signin(formData as TSignInRequest);
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
