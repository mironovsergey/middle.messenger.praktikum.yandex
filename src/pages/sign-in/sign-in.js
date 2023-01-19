import button from '../../components/button';
import form from '../../modules/form';
import backdrop from '../../modules/backdrop';
import modal from '../../modules/modal';

import template from './sign-in.hbs';

const title = `Вход`;
const text = `Нет аккаунта? <a href="/#sign-up">Регистрация</a>`;
const body = form({
    fields: [
        {
            type: 'text',
            name: 'login',
            label: 'Логин'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Пароль'
        }
    ],
    button: button({
        type: 'submit',
        mod: 'primary',
        text: 'Войти'
    })
});

export default (props = {}) => {
    return template({
        backdrop: backdrop(),
        modal: modal({ title, body, text }),
        ...props
    });
};