import button from '../../components/button';
import form from '../../modules/form';
import backdrop from '../../modules/backdrop';
import modal from '../../modules/modal';

import template from './sign-up.hbs';

const title = 'Регистрация'
const text = `Уже есть аккаунт? <a href="/#sign-in">Войти</a>`;
const body = form({
    fields: [
        {
            type: 'email',
            name: 'email',
            label: 'Почта'
        },
        {
            type: 'text',
            name: 'login',
            label: 'Логин'
        },
        {
            type: 'text',
            name: 'first_name',
            label: 'Имя'
        },
        {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия'
        },
        {
            type: 'tel',
            name: 'phone',
            label: 'Телефон'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Пароль'
        },
        {
            type: 'password',
            name: 'password_confirm',
            label: 'Пароль (Еще раз)',
            error: 'Пароли не совпадают'
        }
    ],
    button: button({
        type: 'submit',
        mod: 'primary',
        text: 'Зарегистрироваться'
    })
});

export default (props = {}) => {
    return template({
        backdrop: backdrop(),
        modal: modal({ title, body, text }),
        ...props
    });
};