import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './messages-date.hbs';

import './messages-date.scss';

type TMessagesDate = {
    date: string;
} & TBlockProps;

export default class MessagesDate extends Block<TMessagesDate> {

    constructor(props: TMessagesDate) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
