import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import MessagesItem from '../messages-item';
import MessagesDate from '../messages-date';

import template from './messages.hbs';

import './messages.scss';

type TMessages = {
    messageList?: Array<MessagesDate | MessagesItem>
} & TBlockProps;

export default class Messages extends Block<TMessages> {

    constructor(props = {}) {
        super({
            ...props
        });
    }

    render() {
        return this.compile(template);
    }

    addEvents() {
        const messages = document.querySelector('.messages');

        if (messages && messages.parentElement) {
            messages.parentElement.scrollTop = messages.parentElement.scrollHeight;
        }
    }

}
