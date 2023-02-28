import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Button from '../../../../components/button';
import Dropdown from '../../../../components/dropdown';
import FormControl from '../../../../modules/form/components/form-control';

import template from './message.hbs';

import './message.scss';

import iconLink from 'bundle-text:../../../../../static/images/icons/link.svg';
import iconMessage from 'bundle-text:../../../../../static/images/icons/message.svg';

type TMessage = {
    messageDropdown: Dropdown;
    control: FormControl;
    button: Button;
} & TBlockProps;

export default class Message extends Block<TMessage> {

    constructor(props = {}) {
        super({
            ...props,
            messageDropdown: new Dropdown({
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
            }),
            control: new FormControl({
                type: 'text',
                name: 'message',
                label: 'Cообщение'
            }),
            button: new Button({
                type: 'submit',
                mod: 'primary',
                text: iconMessage
            })
        });
    }

    render() {
        return this.compile(template);
    }

    // addEvents() {
    //     this.getElement().querySelector('form')
    //         .addEventListener('submit', this._props.events.submit);
    // }

}
