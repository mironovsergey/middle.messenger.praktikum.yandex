import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Chats from '../chats';

import template from './messenger-side.hbs';

type TMessengerSide = {
    chats?: Chats;
} & TBlockProps;

export default class MessengerSide extends Block<TMessengerSide> {

    constructor(props = {}) {
        super({
            ...props
        });
    }

    render() {
        return this.compile(template);
    }

}
