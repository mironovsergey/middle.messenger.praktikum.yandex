import button from '../../components/button';
import form from '../../modules/form';

import template from './change-password.hbs';

import './change-password.scss';

import iconBack from 'bundle-text:../../../static/images/icons/back.svg';

const title = 'Изменить пароль';
const body = form({
    fields: [
        {
            type: 'password',
            name: 'oldPassword',
            label: 'Старый пароль'
        },
        {
            type: 'password',
            name: 'newPassword',
            label: 'Новый пароль'
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
