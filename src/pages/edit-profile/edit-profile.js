import button from '../../components/button';
import form from '../../modules/form';

import template from './edit-profile.hbs';

import './edit-profile.scss';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

const title = 'Редактировать профиль';
const body = form({
    fields: [
        {
            type: 'text',
            name: 'display_name',
            label: 'Имя в чате'
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
            type: 'email',
            name: 'email',
            label: 'Почта'
        },
        {
            type: 'tel',
            name: 'phone',
            label: 'Телефон'
        }
    ],
    button: button({
        type: 'submit',
        mod: 'primary',
        text: 'Сохранить'
    })
});

export default (props = {}) => {
    return template({
        title,
        backButton: button({
            type: 'button',
            mod: 'link',
            text: `${iconBack}<span>Назад</span>`
        }),
        body
    });
};
