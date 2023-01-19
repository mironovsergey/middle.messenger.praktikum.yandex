import button from '../../../../components/button';
import dropdown from '../../../../components/dropdown';
import formControl from '../../../../modules/form/components/form-control';

import template from './message.hbs';

import './message.scss';

import iconLink from 'bundle-text:../../../../../static/images/icons/link.svg';
import iconMessage from 'bundle-text:../../../../../static/images/icons/message.svg';

const messageDropdown = {
    icon: iconLink,
    active: true,
    top: true,
    items: [
        {
            icon: '/images/icons/photo.svg',
            text: 'Фото или Видео'
        },
        {
            icon: '/images/icons/file.svg',
            text: 'Файл'
        },
        {
            icon: '/images/icons/location.svg',
            text: 'Локация'
        }
    ]
};

export default (props = {}) => {
    return template({
        messageDropdown: dropdown(messageDropdown),
        control: formControl({
            type: 'text',
            name: 'message',
            label: 'Cообщение'
        }),
        button: button({
            type: 'submit',
            mod: 'primary',
            text: iconMessage
        }),
        ...props
    });
};