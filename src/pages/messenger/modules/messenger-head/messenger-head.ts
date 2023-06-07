import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Chat from '../chat';

import template from './messenger-head.hbs';

type TMessengerHead = {
    chat?: Chat;
} & TBlockProps;

export default class MessengerHead extends Block<TMessengerHead> {

    constructor(props = {}) {
        super({
            ...props
        });
    }

    render() {
        return this.compile(template);
    }

}
